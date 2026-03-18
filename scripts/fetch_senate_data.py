#!/usr/bin/env python3
"""Fetch Senate FY2025 appropriations bill data from Congress.gov API."""

import json
import time
import requests

API_KEY = "CONGRESS_API_KEY"

SENATE_BILLS = {
    "milcon-va": {"number": "4677", "report": "S. Rept. 118-191"},
    "legislative-branch": {"number": "4678", "report": "S. Rept. 118-192"},
    "agriculture": {"number": "4690", "report": "S. Rept. 118-193"},
    "cjs": {"number": "4795", "report": "S. Rept. 118-198"},
    "thud": {"number": "4796", "report": "S. Rept. 118-199"},
    "state-foreign-ops": {"number": "4797", "report": "S. Rept. 118-200"},
    "interior": {"number": "4802", "report": "S. Rept. 118-201"},
    "defense": {"number": "4921", "report": "S. Rept. 118-204"},
    "energy-water": {"number": "4927", "report": "S. Rept. 118-205"},
    "fsgg": {"number": "4928", "report": "S. Rept. 118-206"},
    "lhhs": {"number": "4942", "report": "S. Rept. 118-207"},
}

results = {}

for bill_id, info in SENATE_BILLS.items():
    num = info["number"]
    print(f"Fetching S. {num} ({bill_id})...")

    # Get bill info
    url = f"https://api.congress.gov/v3/bill/118/s/{num}?api_key={API_KEY}"
    resp = requests.get(url, timeout=30)
    data = resp.json()
    bill = data.get("bill", {})

    # Get text versions
    text_url = f"https://api.congress.gov/v3/bill/118/s/{num}/text?api_key={API_KEY}"
    text_resp = requests.get(text_url, timeout=30)
    text_data = text_resp.json()
    versions = text_data.get("textVersions", [])

    result = {
        "id": bill_id,
        "number": f"S {num}",
        "title": bill.get("title", ""),
        "sponsor": bill.get("sponsors", [{}])[0].get("fullName", "") if bill.get("sponsors") else "",
        "introduced": bill.get("introducedDate", ""),
        "latestAction": bill.get("latestAction", {}).get("text", ""),
        "latestActionDate": bill.get("latestAction", {}).get("actionDate", ""),
        "report": info["report"],
        "textVersions": []
    }

    for v in versions:
        version_info = {
            "type": v.get("type", ""),
            "date": v.get("date", "")[:10] if v.get("date") else "",
            "formats": []
        }
        for fmt in v.get("formats", []):
            version_info["formats"].append({
                "type": fmt.get("type", ""),
                "url": fmt.get("url", "")
            })
        result["textVersions"].append(version_info)

    results[bill_id] = result
    print(f"  Title: {result['title'][:80]}")
    print(f"  Versions: {len(versions)}")
    print(f"  Latest: {result['latestAction'][:80]}")
    time.sleep(0.3)

# Output
print("\n" + json.dumps(results, indent=2))
