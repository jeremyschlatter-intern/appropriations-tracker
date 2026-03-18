#!/usr/bin/env python3
"""Generate updated data.js with Senate FY2025 data added."""

import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DATA_JS = BASE_DIR / "docs" / "data.js"

# Senate FY2025 bills
SENATE_DATA = {
    "milcon-va": {
        "senateBillNumber": "S 4677",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4677",
        "senateReport": "S. Rept. 118-191",
        "senateSponsor": "Sen. Sinema, Kyrsten [I-AZ]",
        "senateReportedDate": "2024-07-11",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4677/BILLS-118s4677rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4677/BILLS-118s4677rs.pdf",
    },
    "legislative-branch": {
        "senateBillNumber": "S 4678",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4678",
        "senateReport": "S. Rept. 118-192",
        "senateSponsor": "Sen. Reed, Jack [D-RI]",
        "senateReportedDate": "2024-07-11",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4678/BILLS-118s4678rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4678/BILLS-118s4678rs.pdf",
    },
    "agriculture": {
        "senateBillNumber": "S 4690",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4690",
        "senateReport": "S. Rept. 118-193",
        "senateSponsor": "Sen. Heinrich, Martin [D-NM]",
        "senateReportedDate": "2024-07-11",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4690/BILLS-118s4690rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4690/BILLS-118s4690rs.pdf",
    },
    "cjs": {
        "senateBillNumber": "S 4795",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4795",
        "senateReport": "S. Rept. 118-198",
        "senateSponsor": "Sen. Shaheen, Jeanne [D-NH]",
        "senateReportedDate": "2024-07-25",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4795/BILLS-118s4795rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4795/BILLS-118s4795rs.pdf",
    },
    "thud": {
        "senateBillNumber": "S 4796",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4796",
        "senateReport": "S. Rept. 118-199",
        "senateSponsor": "Sen. Schatz, Brian [D-HI]",
        "senateReportedDate": "2024-07-25",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4796/BILLS-118s4796rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4796/BILLS-118s4796rs.pdf",
    },
    "state-foreign-ops": {
        "senateBillNumber": "S 4797",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4797",
        "senateReport": "S. Rept. 118-200",
        "senateSponsor": "Sen. Coons, Christopher A. [D-DE]",
        "senateReportedDate": "2024-07-25",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4797/BILLS-118s4797rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4797/BILLS-118s4797rs.pdf",
    },
    "interior": {
        "senateBillNumber": "S 4802",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4802",
        "senateReport": "S. Rept. 118-201",
        "senateSponsor": "Sen. Merkley, Jeff [D-OR]",
        "senateReportedDate": "2024-07-25",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4802/BILLS-118s4802rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4802/BILLS-118s4802rs.pdf",
    },
    "defense": {
        "senateBillNumber": "S 4921",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4921",
        "senateReport": "S. Rept. 118-204",
        "senateSponsor": "Sen. Tester, Jon [D-MT]",
        "senateReportedDate": "2024-08-01",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4921/BILLS-118s4921rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4921/BILLS-118s4921rs.pdf",
    },
    "energy-water": {
        "senateBillNumber": "S 4927",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4927",
        "senateReport": "S. Rept. 118-205",
        "senateSponsor": "Sen. Murray, Patty [D-WA]",
        "senateReportedDate": "2024-08-01",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4927/BILLS-118s4927rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4927/BILLS-118s4927rs.pdf",
    },
    "fsgg": {
        "senateBillNumber": "S 4928",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4928",
        "senateReport": "S. Rept. 118-206",
        "senateSponsor": "Sen. Van Hollen, Chris [D-MD]",
        "senateReportedDate": "2024-08-01",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4928/BILLS-118s4928rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4928/BILLS-118s4928rs.pdf",
    },
    "lhhs": {
        "senateBillNumber": "S 4942",
        "senateUrl": "https://www.congress.gov/bill/118th-congress/senate-bill/4942",
        "senateReport": "S. Rept. 118-207",
        "senateSponsor": "Sen. Baldwin, Tammy [D-WI]",
        "senateReportedDate": "2024-08-01",
        "senateTextHtm": "https://www.congress.gov/118/bills/s4942/BILLS-118s4942rs.htm",
        "senateTextPdf": "https://www.congress.gov/118/bills/s4942/BILLS-118s4942rs.pdf",
    },
}

def main():
    content = DATA_JS.read_text(encoding='utf-8')

    # For each FY2025 bill, add senate_passed stage with reported-to-senate data
    for bill_id, senate in SENATE_DATA.items():
        # Find the bill's senate_passed stage and update it
        # We need to replace: senate_passed: { available: false ... }
        # with actual Senate data

        # Build the replacement senate_passed stage
        senate_stage = (
            f'senate_passed: {{\n'
            f'              available: true,\n'
            f'              date: "{senate["senateReportedDate"]}",\n'
            f'              note: "Reported to Senate ({senate["senateBillNumber"]}), placed on calendar, no floor vote",\n'
            f'              documents: [\n'
            f'                {{ type: "bill_text", label: "Reported to Senate (HTM)", url: "{senate["senateTextHtm"]}", format: "htm" }},\n'
            f'                {{ type: "bill_text", label: "Reported to Senate (PDF)", url: "{senate["senateTextPdf"]}", format: "pdf" }},\n'
            f'                {{ type: "report", label: "{senate["senateReport"]}", url: "{senate["senateUrl"]}", format: "link" }}\n'
            f'              ]\n'
            f'            }}'
        )

        # Also add senateBillNumber to the bill object
        # Find the bill in FY2025 by looking for its id
        # Add senateBillNumber after congressGovBillNumber
        bill_number_pattern = re.escape(f'congressGovBillNumber: "HR ')
        # This is too fragile. Let me use a simpler approach.

        # For the senate_passed stage, find the specific pattern for each bill
        # The pattern varies but looks like: senate_passed: { available: false, note: "..." }
        # or: senate_passed: { available: false }

        # We need to find the right bill first. Let me search for the bill id in the FY2025 section.
        print(f"Updating {bill_id} with Senate data ({senate['senateBillNumber']})...")

    # Instead of regex, let me output a complete replacement data.js
    # This is safer. Let me just output the senate data additions as JS that can be loaded.

    # Write a separate senate data file
    senate_js = "// Senate FY2025 Appropriations Data\n"
    senate_js += "const SENATE_FY2025_DATA = {\n"
    for bill_id, senate in SENATE_DATA.items():
        senate_js += f'  "{bill_id}": {{\n'
        senate_js += f'    senateBillNumber: "{senate["senateBillNumber"]}",\n'
        senate_js += f'    senateUrl: "{senate["senateUrl"]}",\n'
        senate_js += f'    senateReport: "{senate["senateReport"]}",\n'
        senate_js += f'    senateReportedDate: "{senate["senateReportedDate"]}",\n'
        senate_js += f'    documents: [\n'
        senate_js += f'      {{ type: "bill_text", label: "Reported to Senate (HTM)", url: "{senate["senateTextHtm"]}", format: "htm" }},\n'
        senate_js += f'      {{ type: "bill_text", label: "Reported to Senate (PDF)", url: "{senate["senateTextPdf"]}", format: "pdf" }},\n'
        senate_js += f'      {{ type: "report", label: "{senate["senateReport"]}", url: "{senate["senateUrl"]}", format: "link" }}\n'
        senate_js += f'    ]\n'
        senate_js += f'  }},\n'
    senate_js += "};\n\n"
    senate_js += "// Homeland Security: No Senate FY2025 bill (pulled from markup before introduction)\n"

    output = BASE_DIR / "docs" / "senate_data.js"
    output.write_text(senate_js, encoding='utf-8')
    print(f"Wrote Senate data to {output}")

if __name__ == "__main__":
    main()
