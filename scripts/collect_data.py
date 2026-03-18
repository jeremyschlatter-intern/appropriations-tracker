#!/usr/bin/env python3
"""
Collect FY2025 (118th Congress) appropriations bill data from Congress.gov API.

Fetches bill metadata, text versions, committee reports, amendments, and actions.
Downloads HTML bill text, generates diffs between consecutive versions, and
outputs a master JSON file.
"""

import difflib
import json
import os
import re
import sys
import time
from pathlib import Path

import requests

# ── Configuration ────────────────────────────────────────────────────────────

API_KEY = "CONGRESS_API_KEY"
BASE_URL = "https://api.congress.gov/v3"
CONGRESS = 118

# Directories
PROJECT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_DIR / "data"
BILL_TEXT_DIR = DATA_DIR / "bill_text"
DIFFS_DIR = DATA_DIR / "diffs"
API_DATA_FILE = DATA_DIR / "api_data.json"

# Rate limiting: 5000 req/hour => ~1.4 req/sec max. Use 0.8s to stay safe.
REQUEST_DELAY = 0.8

# Known FY2025 appropriations bills
BILLS = [
    # House bills
    {"type": "hr", "number": "8580", "short_name": "MilCon-VA"},
    {"type": "hr", "number": "8774", "short_name": "Defense"},
    {"type": "hr", "number": "8752", "short_name": "Homeland Security"},
    {"type": "hr", "number": "8998", "short_name": "Interior-Env"},
    {"type": "hr", "number": "8771", "short_name": "State-Foreign Ops"},
    {"type": "hr", "number": "8772", "short_name": "Legislative Branch"},
    {"type": "hr", "number": "8773", "short_name": "FSGG"},
    {"type": "hr", "number": "8997", "short_name": "Energy-Water"},
    {"type": "hr", "number": "9027", "short_name": "Agriculture"},
    {"type": "hr", "number": "9026", "short_name": "CJS"},
    {"type": "hr", "number": "9029", "short_name": "Labor-HHS"},
    {"type": "hr", "number": "9028", "short_name": "THUD"},
    # Senate bills
    {"type": "s", "number": "4677", "short_name": "MilCon-VA"},
    {"type": "s", "number": "4678", "short_name": "Legislative Branch"},
    {"type": "s", "number": "4690", "short_name": "Agriculture"},
    {"type": "s", "number": "4795", "short_name": "CJS"},
    {"type": "s", "number": "4796", "short_name": "THUD"},
    {"type": "s", "number": "4797", "short_name": "State-Foreign Ops"},
    {"type": "s", "number": "4802", "short_name": "Interior-Env"},
    {"type": "s", "number": "4921", "short_name": "Defense"},
    {"type": "s", "number": "4927", "short_name": "Energy-Water"},
    {"type": "s", "number": "4928", "short_name": "FSGG"},
    {"type": "s", "number": "4942", "short_name": "Labor-HHS"},
]

# ── Helpers ──────────────────────────────────────────────────────────────────

session = requests.Session()
_last_request_time = 0.0


def api_get(url, params=None):
    """Make a rate-limited GET request to the Congress.gov API."""
    global _last_request_time

    if params is None:
        params = {}
    params["api_key"] = API_KEY
    params.setdefault("format", "json")

    elapsed = time.time() - _last_request_time
    if elapsed < REQUEST_DELAY:
        time.sleep(REQUEST_DELAY - elapsed)

    for attempt in range(3):
        try:
            _last_request_time = time.time()
            resp = session.get(url, params=params, timeout=30)
            if resp.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited. Waiting {wait}s ...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()
        except requests.exceptions.RequestException as exc:
            if attempt < 2:
                print(f"  Request error ({exc}). Retrying in 5s ...")
                time.sleep(5)
            else:
                print(f"  FAILED after 3 attempts: {exc}")
                return None
    return None


def api_get_all(url, key, params=None, max_items=500):
    """Paginate through an API endpoint and collect all items."""
    if params is None:
        params = {}
    params["limit"] = 250
    params["offset"] = 0
    items = []

    while True:
        data = api_get(url, dict(params))
        if data is None:
            break
        batch = data.get(key, [])
        items.extend(batch)
        if len(batch) < 250 or len(items) >= max_items:
            break
        params["offset"] += 250

    return items


def download_file(url, dest_path):
    """Download a file if it doesn't already exist. Returns True on success."""
    if dest_path.exists() and dest_path.stat().st_size > 0:
        return True

    global _last_request_time
    elapsed = time.time() - _last_request_time
    if elapsed < REQUEST_DELAY:
        time.sleep(REQUEST_DELAY - elapsed)

    for attempt in range(3):
        try:
            _last_request_time = time.time()
            resp = session.get(url, timeout=60)
            if resp.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"    Rate limited downloading. Waiting {wait}s ...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            dest_path.write_bytes(resp.content)
            return True
        except requests.exceptions.RequestException as exc:
            if attempt < 2:
                print(f"    Download error ({exc}). Retrying ...")
                time.sleep(5)
            else:
                print(f"    FAILED to download: {exc}")
                return False
    return False


def bill_id(bill_type, number):
    """Create a canonical bill identifier like 'hr8580' or 's4677'."""
    return f"{bill_type}{number}"


def safe_filename(s):
    """Convert a string to a safe filename component."""
    return re.sub(r"[^a-zA-Z0-9_-]", "_", s).strip("_")


# ── Text version ordering ───────────────────────────────────────────────────

VERSION_ORDER = [
    "Introduced in House",
    "Introduced in Senate",
    "Reported in House",
    "Reported in Senate",
    "Engrossed in House",
    "Engrossed in Senate",
    "Placed on Calendar Senate",
    "Placed on Calendar House",
    "Referred in Senate",
    "Referred in House",
    "Received in Senate",
    "Received in House",
    "Enrolled Bill",
    "Public Print",
]


def version_sort_key(version):
    """Sort key for text versions: primarily by date, secondarily by type."""
    date_str = version.get("date", "") or "9999-12-31"
    vtype = version.get("type", "")
    try:
        type_idx = VERSION_ORDER.index(vtype)
    except ValueError:
        type_idx = 999
    return (date_str, type_idx)


# ── Main collection functions ────────────────────────────────────────────────

def fetch_bill_metadata(bill_type, number):
    """Fetch core bill metadata."""
    url = f"{BASE_URL}/bill/{CONGRESS}/{bill_type}/{number}"
    data = api_get(url)
    if data is None:
        return None
    return data.get("bill", {})


def fetch_text_versions(bill_type, number):
    """Fetch all text versions for a bill."""
    url = f"{BASE_URL}/bill/{CONGRESS}/{bill_type}/{number}/text"
    versions = api_get_all(url, "textVersions")
    return sorted(versions, key=version_sort_key)


def fetch_actions(bill_type, number):
    """Fetch all actions for a bill."""
    url = f"{BASE_URL}/bill/{CONGRESS}/{bill_type}/{number}/actions"
    return api_get_all(url, "actions")


def fetch_amendments(bill_type, number, limit=50):
    """Fetch amendments for a bill (up to limit)."""
    url = f"{BASE_URL}/bill/{CONGRESS}/{bill_type}/{number}/amendments"
    return api_get_all(url, "amendments", max_items=limit)


def fetch_committee_reports(bill_meta):
    """Fetch committee report details from bill metadata."""
    reports = []
    for cr in bill_meta.get("committeeReports", []):
        cr_url = cr.get("url", "")
        if not cr_url:
            continue
        data = api_get(cr_url)
        if data and "committeeReports" in data:
            for rpt in data["committeeReports"]:
                reports.append({
                    "citation": rpt.get("citation", ""),
                    "title": rpt.get("title", ""),
                    "chamber": rpt.get("chamber", ""),
                    "issueDate": rpt.get("issueDate", ""),
                    "type": rpt.get("type", ""),
                    "number": rpt.get("number", ""),
                    "isConferenceReport": rpt.get("isConferenceReport", False),
                    "textUrl": rpt.get("text", {}).get("url", ""),
                })
    return reports


def download_bill_texts(bid, versions):
    """Download HTML text for each version. Returns list of (version_type, filepath) tuples."""
    downloaded = []
    bill_dir = BILL_TEXT_DIR / bid
    bill_dir.mkdir(parents=True, exist_ok=True)

    for v in versions:
        vtype = v.get("type", "unknown")
        html_url = None
        all_formats = {}

        for fmt in v.get("formats", []):
            fmt_type = fmt.get("type", "")
            fmt_url = fmt.get("url", "")
            all_formats[fmt_type] = fmt_url
            if fmt_type == "Formatted Text" and fmt_url.endswith(".htm"):
                html_url = fmt_url

        if html_url:
            # Derive filename from URL
            fname = html_url.split("/")[-1]
            dest = bill_dir / fname
            print(f"    Downloading {vtype}: {fname} ...", end=" ")
            if dest.exists() and dest.stat().st_size > 0:
                print("(cached)")
            else:
                ok = download_file(html_url, dest)
                print("OK" if ok else "FAILED")
            downloaded.append({
                "version_type": vtype,
                "date": v.get("date", ""),
                "filename": fname,
                "filepath": str(dest),
                "formats": all_formats,
            })
        else:
            print(f"    No HTML format for version '{vtype}', skipping download")
            downloaded.append({
                "version_type": vtype,
                "date": v.get("date", ""),
                "filename": None,
                "filepath": None,
                "formats": all_formats,
            })

    return downloaded


def extract_text_from_html(filepath):
    """Extract readable text from HTML bill text for diffing."""
    if filepath is None or not Path(filepath).exists():
        return ""
    html = Path(filepath).read_text(encoding="utf-8", errors="replace")
    # Remove HTML tags for cleaner diff
    text = re.sub(r"<style[^>]*>.*?</style>", "", html, flags=re.DOTALL)
    text = re.sub(r"<script[^>]*>.*?</script>", "", text, flags=re.DOTALL)
    text = re.sub(r"<[^>]+>", " ", text)
    # Normalize whitespace
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n", "\n", text)
    return text.strip()


def generate_diffs(bid, downloaded_versions):
    """Generate HTML diffs between consecutive versions of a bill."""
    diff_files = []
    # Filter to versions that have downloaded files
    versions_with_text = [v for v in downloaded_versions if v.get("filepath")]

    if len(versions_with_text) < 2:
        return diff_files

    for i in range(len(versions_with_text) - 1):
        v1 = versions_with_text[i]
        v2 = versions_with_text[i + 1]

        v1_type = safe_filename(v1["version_type"])
        v2_type = safe_filename(v2["version_type"])
        diff_fname = f"{bid}__{v1_type}__to__{v2_type}.html"
        diff_path = DIFFS_DIR / diff_fname

        if diff_path.exists() and diff_path.stat().st_size > 0:
            print(f"    Diff {v1['version_type']} -> {v2['version_type']}: (cached)")
            diff_files.append({
                "from_version": v1["version_type"],
                "to_version": v2["version_type"],
                "from_date": v1.get("date", ""),
                "to_date": v2.get("date", ""),
                "filename": diff_fname,
            })
            continue

        print(f"    Diffing {v1['version_type']} -> {v2['version_type']} ...", end=" ")

        text1 = extract_text_from_html(v1["filepath"])
        text2 = extract_text_from_html(v2["filepath"])

        if not text1 or not text2:
            print("(empty text, skipped)")
            continue

        lines1 = text1.splitlines(keepends=True)
        lines2 = text2.splitlines(keepends=True)

        diff_html = difflib.HtmlDiff(wrapcolumn=80).make_file(
            lines1,
            lines2,
            fromdesc=f"{bid} - {v1['version_type']} ({v1.get('date', 'N/A')})",
            todesc=f"{bid} - {v2['version_type']} ({v2.get('date', 'N/A')})",
            context=True,
            numlines=5,
        )

        DIFFS_DIR.mkdir(parents=True, exist_ok=True)
        diff_path.write_text(diff_html, encoding="utf-8")
        print("OK")

        diff_files.append({
            "from_version": v1["version_type"],
            "to_version": v2["version_type"],
            "from_date": v1.get("date", ""),
            "to_date": v2.get("date", ""),
            "filename": diff_fname,
        })

    return diff_files


# ── Main ─────────────────────────────────────────────────────────────────────

def collect_bill(bill_spec):
    """Collect all data for a single bill."""
    bt = bill_spec["type"]
    bn = bill_spec["number"]
    short = bill_spec["short_name"]
    bid = bill_id(bt, bn)
    chamber = "House" if bt == "hr" else "Senate"

    print(f"\n{'='*70}")
    print(f"  {chamber} {bt.upper()} {bn} - {short}")
    print(f"{'='*70}")

    # 1. Metadata
    print("  Fetching metadata ...")
    meta = fetch_bill_metadata(bt, bn)
    if meta is None:
        print("  ERROR: Could not fetch bill metadata. Skipping.")
        return None

    bill_data = {
        "bill_id": bid,
        "bill_type": bt.upper(),
        "number": bn,
        "short_name": short,
        "chamber": chamber,
        "title": meta.get("title", ""),
        "introduced_date": meta.get("introducedDate", ""),
        "latest_action": meta.get("latestAction", {}),
        "policy_area": meta.get("policyArea", {}).get("name", ""),
        "sponsors": [],
        "legislation_url": meta.get("legislationUrl", ""),
    }

    for sp in meta.get("sponsors", []):
        bill_data["sponsors"].append({
            "name": sp.get("fullName", ""),
            "party": sp.get("party", ""),
            "state": sp.get("state", ""),
        })

    # 2. Text versions
    print("  Fetching text versions ...")
    versions = fetch_text_versions(bt, bn)
    print(f"    Found {len(versions)} text version(s)")

    bill_data["text_versions_raw"] = versions

    # Download HTML texts
    print("  Downloading bill texts ...")
    downloaded = download_bill_texts(bid, versions)
    bill_data["downloaded_texts"] = downloaded

    # 3. Committee reports
    print("  Fetching committee reports ...")
    reports = fetch_committee_reports(meta)
    print(f"    Found {len(reports)} report(s)")
    bill_data["committee_reports"] = reports

    # 4. Amendments
    print("  Fetching amendments ...")
    amendments_raw = fetch_amendments(bt, bn)
    amendment_count = meta.get("amendments", {}).get("count", 0)
    print(f"    Total amendment count: {amendment_count}")

    key_amendments = []
    for amd in amendments_raw[:20]:  # Keep top 20
        key_amendments.append({
            "number": amd.get("number", ""),
            "type": amd.get("type", ""),
            "description": amd.get("description", ""),
            "purpose": amd.get("purpose", ""),
            "latest_action": amd.get("latestAction", {}),
        })

    bill_data["amendment_count"] = amendment_count
    bill_data["key_amendments"] = key_amendments

    # 5. Actions
    print("  Fetching actions ...")
    actions = fetch_actions(bt, bn)
    print(f"    Found {len(actions)} action(s)")
    bill_data["actions"] = actions

    # 6. Generate diffs
    print("  Generating diffs ...")
    diffs = generate_diffs(bid, downloaded)
    print(f"    Generated {len(diffs)} diff(s)")
    bill_data["diffs"] = diffs

    return bill_data


def main():
    print("=" * 70)
    print("  FY2025 Appropriations Bill Data Collector")
    print(f"  118th Congress | {len(BILLS)} bills to process")
    print("=" * 70)

    # Ensure directories exist
    BILL_TEXT_DIR.mkdir(parents=True, exist_ok=True)
    DIFFS_DIR.mkdir(parents=True, exist_ok=True)

    # Check for existing data to support idempotency
    existing_data = {}
    if API_DATA_FILE.exists():
        try:
            with open(API_DATA_FILE) as f:
                existing_data = json.load(f)
            print(f"\n  Found existing api_data.json with {len(existing_data.get('bills', {}))} bill(s)")
        except (json.JSONDecodeError, KeyError):
            existing_data = {}

    all_bills = {}
    errors = []

    for i, bill_spec in enumerate(BILLS, 1):
        bid = bill_id(bill_spec["type"], bill_spec["number"])
        print(f"\n  [{i}/{len(BILLS)}] Processing {bid} ...")

        try:
            bill_data = collect_bill(bill_spec)
            if bill_data:
                all_bills[bid] = bill_data
            else:
                errors.append(bid)
        except Exception as exc:
            print(f"  ERROR processing {bid}: {exc}")
            errors.append(bid)
            import traceback
            traceback.print_exc()

    # Build master output
    output = {
        "metadata": {
            "congress": CONGRESS,
            "fiscal_year": 2025,
            "collected_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "bill_count": len(all_bills),
            "bills_with_errors": errors,
        },
        "bills": all_bills,
    }

    # Write JSON
    print(f"\n{'='*70}")
    print(f"  Writing master JSON to {API_DATA_FILE}")
    with open(API_DATA_FILE, "w") as f:
        json.dump(output, f, indent=2, default=str)
    print(f"  File size: {API_DATA_FILE.stat().st_size / 1024:.1f} KB")

    # Summary
    print(f"\n{'='*70}")
    print("  SUMMARY")
    print(f"{'='*70}")
    print(f"  Bills processed:  {len(all_bills)}")
    print(f"  Errors:           {len(errors)}")

    total_versions = sum(
        len(b.get("downloaded_texts", [])) for b in all_bills.values()
    )
    total_diffs = sum(len(b.get("diffs", [])) for b in all_bills.values())
    total_amendments = sum(b.get("amendment_count", 0) for b in all_bills.values())

    print(f"  Text versions:    {total_versions}")
    print(f"  Diffs generated:  {total_diffs}")
    print(f"  Total amendments: {total_amendments}")

    # List downloaded files
    text_files = list(BILL_TEXT_DIR.rglob("*.htm"))
    diff_files = list(DIFFS_DIR.glob("*.html"))
    print(f"  HTML texts saved: {len(text_files)}")
    print(f"  Diff files saved: {len(diff_files)}")

    if errors:
        print(f"\n  Bills with errors: {', '.join(errors)}")

    print(f"\n  Data directory: {DATA_DIR}")
    print(f"  Done!")
    return 0 if not errors else 1


if __name__ == "__main__":
    sys.exit(main())
