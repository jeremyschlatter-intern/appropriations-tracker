#!/usr/bin/env python3
"""Fetch bill text from Congress.gov and generate diffs between versions.

For FY2025 bills that have multiple text versions (Reported in House, Engrossed
in House, Placed on Calendar Senate), this script downloads the HTML text and
generates HTML diff output that can be embedded in the web application.
"""

import os
import re
import json
import time
import difflib
import html
import requests
from pathlib import Path

API_KEY = "CONGRESS_API_KEY"
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
TEXT_DIR = DATA_DIR / "bill_text"
DIFF_DIR = DATA_DIR / "diffs"

# FY2025 bills with multiple text versions
MULTI_VERSION_BILLS = {
    "milcon-va": {
        "number": "8580",
        "versions": [
            {"stage": "full_committee_bill", "suffix": "rh", "label": "Reported in House"},
            {"stage": "house_passed", "suffix": "eh", "label": "Engrossed in House"},
        ]
    },
    "defense": {
        "number": "8774",
        "versions": [
            {"stage": "full_committee_bill", "suffix": "rh", "label": "Reported in House"},
            {"stage": "house_passed", "suffix": "eh", "label": "Engrossed in House"},
        ]
    },
    "homeland": {
        "number": "8752",
        "versions": [
            {"stage": "full_committee_bill", "suffix": "rh", "label": "Reported in House"},
            {"stage": "house_passed", "suffix": "eh", "label": "Engrossed in House"},
        ]
    },
    "interior": {
        "number": "8998",
        "versions": [
            {"stage": "full_committee_bill", "suffix": "rh", "label": "Reported in House"},
            {"stage": "house_passed", "suffix": "eh", "label": "Engrossed in House"},
        ]
    },
    "state-foreign-ops": {
        "number": "8771",
        "versions": [
            {"stage": "full_committee_bill", "suffix": "rh", "label": "Reported in House"},
            {"stage": "house_passed", "suffix": "eh", "label": "Engrossed in House"},
        ]
    },
}


def ensure_dirs():
    TEXT_DIR.mkdir(parents=True, exist_ok=True)
    DIFF_DIR.mkdir(parents=True, exist_ok=True)


def fetch_bill_text(bill_number, suffix):
    """Download bill text HTML from Congress.gov."""
    filename = TEXT_DIR / f"hr{bill_number}-{suffix}.htm"
    if filename.exists():
        print(f"  Already have {filename.name}")
        return filename.read_text(encoding='utf-8')

    url = f"https://www.congress.gov/118/bills/hr{bill_number}/BILLS-118hr{bill_number}{suffix}.htm"
    print(f"  Fetching {url}...")
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        text = resp.text
        filename.write_text(text, encoding='utf-8')
        time.sleep(0.5)  # Be polite
        return text
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


def html_to_text(html_content):
    """Extract plain text from Congress.gov bill HTML."""
    # Remove script/style
    text = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)

    # Convert block elements to newlines
    text = re.sub(r'</?(p|div|h[1-6]|li|tr|section|article|br)[^>]*/?>', '\n', text, flags=re.IGNORECASE)

    # Remove remaining tags
    text = re.sub(r'<[^>]+>', '', text)

    # Decode entities
    text = html.unescape(text)

    # Normalize whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)

    # Split into lines and clean
    lines = [line.strip() for line in text.split('\n')]
    lines = [line for line in lines if line]

    return lines


def generate_diff_html(lines_a, lines_b, label_a, label_b):
    """Generate an HTML diff of two bill text versions."""
    differ = difflib.unified_diff(lines_a, lines_b, lineterm='', n=3)
    diff_lines = list(differ)

    if not diff_lines:
        return '<div class="diff-container"><div class="diff-stats"><span>No differences found</span></div></div>'

    # Count stats
    added = sum(1 for l in diff_lines if l.startswith('+') and not l.startswith('+++'))
    removed = sum(1 for l in diff_lines if l.startswith('-') and not l.startswith('---'))
    unchanged = len(lines_a) - removed

    result = []
    result.append('<div class="diff-container">')
    result.append(f'<div class="diff-stats">')
    result.append(f'<span class="diff-stat-unchanged">{unchanged} unchanged</span>')
    result.append(f'<span class="diff-stat-added">+{added} added</span>')
    result.append(f'<span class="diff-stat-removed">-{removed} removed</span>')
    result.append('</div>')
    result.append('<div class="diff-body diff-compact">')

    line_a = 0
    line_b = 0

    for line in diff_lines:
        if line.startswith('@@'):
            # Hunk header
            result.append(f'<div class="diff-separator">{html.escape(line)}</div>')
            # Parse line numbers from @@ -a,b +c,d @@
            match = re.match(r'@@ -(\d+)', line)
            if match:
                line_a = int(match.group(1)) - 1
            match = re.match(r'@@ -\d+(?:,\d+)? \+(\d+)', line)
            if match:
                line_b = int(match.group(1)) - 1
        elif line.startswith('---') or line.startswith('+++'):
            continue
        elif line.startswith('-'):
            line_a += 1
            escaped = html.escape(line[1:])
            result.append(f'<div class="diff-line diff-removed">'
                         f'<span class="diff-gutter">{line_a}</span>'
                         f'<span class="diff-gutter"></span>'
                         f'<span class="diff-marker">-</span>'
                         f'<span class="diff-text">{escaped}</span></div>')
        elif line.startswith('+'):
            line_b += 1
            escaped = html.escape(line[1:])
            result.append(f'<div class="diff-line diff-added">'
                         f'<span class="diff-gutter"></span>'
                         f'<span class="diff-gutter">{line_b}</span>'
                         f'<span class="diff-marker">+</span>'
                         f'<span class="diff-text">{escaped}</span></div>')
        else:
            line_a += 1
            line_b += 1
            escaped = html.escape(line[1:] if line.startswith(' ') else line)
            result.append(f'<div class="diff-line diff-equal">'
                         f'<span class="diff-gutter">{line_a}</span>'
                         f'<span class="diff-gutter">{line_b}</span>'
                         f'<span class="diff-marker"> </span>'
                         f'<span class="diff-text">{escaped}</span></div>')

    result.append('</div></div>')
    return '\n'.join(result)


def main():
    ensure_dirs()
    diffs = {}

    print("Fetching bill text and generating diffs for FY2025 multi-version bills...\n")

    for bill_id, bill_info in MULTI_VERSION_BILLS.items():
        number = bill_info["number"]
        versions = bill_info["versions"]
        print(f"Bill: HR {number} ({bill_id})")

        texts = {}
        for v in versions:
            html_content = fetch_bill_text(number, v["suffix"])
            if html_content:
                texts[v["stage"]] = {
                    "lines": html_to_text(html_content),
                    "label": v["label"]
                }

        # Generate diffs between consecutive versions
        for i in range(len(versions) - 1):
            stage_a = versions[i]["stage"]
            stage_b = versions[i + 1]["stage"]
            if stage_a in texts and stage_b in texts:
                key = f"{bill_id}:{stage_a}:{stage_b}"
                print(f"  Generating diff: {texts[stage_a]['label']} -> {texts[stage_b]['label']}")
                diff_html = generate_diff_html(
                    texts[stage_a]["lines"],
                    texts[stage_b]["lines"],
                    texts[stage_a]["label"],
                    texts[stage_b]["label"]
                )
                diffs[key] = diff_html

                # Save individual diff file
                diff_file = DIFF_DIR / f"{bill_id}_{stage_a}_vs_{stage_b}.html"
                diff_file.write_text(diff_html, encoding='utf-8')
                print(f"  Saved diff to {diff_file.name}")

    # Save all diffs as JSON for embedding
    diffs_json = DIFF_DIR / "all_diffs.json"
    diffs_json.write_text(json.dumps(diffs, indent=2), encoding='utf-8')
    print(f"\nSaved {len(diffs)} diffs to {diffs_json}")

    # Generate JS data file fragment
    js_fragment = "// Pre-computed diffs for embedding in data.js\n"
    js_fragment += "// Add this to APPROPRIATIONS_DATA.diffs\n"
    js_fragment += "const PRECOMPUTED_DIFFS = " + json.dumps(diffs) + ";\n"
    js_file = DIFF_DIR / "diffs_data.js"
    js_file.write_text(js_fragment, encoding='utf-8')
    print(f"Saved JS fragment to {js_file}")


if __name__ == "__main__":
    main()
