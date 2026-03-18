# After-Action Report: Appropriations Bill Version Tracker

**Project**: Track every version of the 12 annual appropriations bills through the legislative process
**Live URL**: https://jeremyschlatter-intern.github.io/appropriations-tracker/
**Repository**: https://github.com/jeremyschlatter-intern/appropriations-tracker

## What I Built

A web application that aggregates and organizes appropriations bill documents from multiple sources into a single interface. It addresses a real pain point identified by Daniel Schuman: committee-published documents often take days or weeks to appear on Congress.gov, leaving congressional staff, advocates, and researchers scrambling across multiple websites.

### Key Features

1. **Bill Tracker Matrix** - A color-coded spreadsheet showing all 12 appropriations bills across 10 legislative stages. Green = document available (clickable for details), red = failed, gray = not yet reached. Shows bill numbers for both chambers (e.g., "HR 8580 / S 4677").

2. **Real Text Comparison** - For the 5 FY2025 bills that passed the House, the tool downloads bill text from Congress.gov and generates line-by-line diffs. Users can see exactly what changed between the committee-reported version and the House-passed version, with additions in green and deletions in red.

3. **Bicameral Coverage** - FY2025 data includes all 12 House bills and 11 of 12 Senate bills (Homeland Security was the only bill the Senate did not report). Bill text and committee reports are linked for both chambers.

4. **CSV Export** - Generates a downloadable spreadsheet of all bills and their status at each stage, with dates, votes, and document URLs.

5. **Timeline View** - Select any bill to see a vertical timeline of its progress through all stages, with document links and amendment summaries.

6. **FY2026 House Committee Data** - All 12 FY2026 bills tracked from the House Appropriations Committee website, including ~115 PDF documents (subcommittee marks, full committee marks, summaries, reports, amendments, roll call votes).

### Data Sources
- **House Appropriations Committee website** (appropriations.house.gov, docs.house.gov) - for FY2026 committee-stage documents
- **Congress.gov API** - for FY2025 bill metadata, text versions, amendments, and committee reports
- **Senate Appropriations Committee** - 11 FY2025 bills from Senate committee

## Process and Obstacles

### 1. Data Discovery (Finding the Right Sources)

**Obstacle**: The project description mentions that committee data is published before it reaches Congress.gov, but I needed to figure out exactly where each type of document lives.

**What I did**: I launched parallel research agents to simultaneously scrape the House Appropriations Committee markup pages (appropriations.house.gov) and search the Congress.gov API. The House agent systematically visited every FY2026 markup page and extracted ~115 PDF document URLs. The API agent found all 12 FY2025 House bills with their text versions and committee reports.

**Result**: Complete document inventories for both fiscal years from authoritative sources.

### 2. Senate Data (The Biggest Gap)

**Obstacle**: My initial version only included House data. A simulated review from a DC policy expert correctly flagged this as the most critical gap - anyone tracking appropriations needs to see both chambers.

**What I did**: I searched the Congress.gov API for Senate appropriations bills. They weren't easy to find because the API doesn't have a simple "appropriations" filter. I used web search to identify the 11 Senate bill numbers (S 4677 through S 4942), then wrote a script to batch-fetch metadata and text version URLs for each. I discovered that the Senate reported 11 of 12 FY2025 bills (Homeland Security was pulled from markup before introduction).

**Result**: Full bicameral coverage for FY2025. The matrix now shows House and Senate bill numbers side by side, with green indicators for both chambers' reported bills.

### 3. Making the Comparison Tool Real (Not Just Links)

**Obstacle**: My first version of the "Compare" feature just showed links to two documents and told users to use DiffChecker. The DC agent reviewer correctly called this out as the biggest functional gap.

**What I did**: I wrote a Python script (`scripts/fetch_and_diff.py`) that downloads bill text HTML from Congress.gov, strips HTML to plain text, and generates unified diffs using Python's difflib. For the 5 bills with multiple text versions (those that passed the House), the script produces line-by-line comparisons. I also wrote a JavaScript diff library for potential client-side diffing.

**Result**: Pre-computed diffs for 5 bills, loaded on demand (891KB JSON). Users can now see exactly what floor amendments changed between the committee version and the House-passed version - for example, MilCon-VA shows 1,718 unchanged lines, 230 added, and 165 removed.

### 4. FY2026 Data Structure (Committee vs. Congress.gov)

**Obstacle**: FY2026 appropriations bills have been marked up by the House Appropriations Committee but have NOT been formally introduced as numbered bills on Congress.gov. This is exactly the scenario the project describes - committee data exists before Congress.gov catches up.

**What I did**: I structured the data model to handle both sources. FY2026 bills have null Congress.gov bill numbers but link directly to committee documents on docs.house.gov and appropriations.house.gov. The status banner explains this to users.

**Result**: Users can access FY2026 committee documents immediately, months before they appear on Congress.gov.

### 5. Deployment (Chrome on a Remote Machine)

**Obstacle**: The Chrome browser I use for testing runs on a different machine on the local network, so localhost and file:// URLs don't work.

**What I did**: Deployed to GitHub Pages from the /docs directory. This also makes the tool publicly accessible to anyone.

**Result**: Live at https://jeremyschlatter-intern.github.io/appropriations-tracker/

## Iterative Review Process

I created a simulated "DC agent" - an AI persona modeled on Daniel Schuman - to review the tool from the perspective of someone who actually tracks appropriations professionally. This produced actionable feedback across two rounds:

**Round 1 feedback** (5 issues):
1. Compare feature was a shell - FIXED (real diffs now)
2. Missing Senate data - FIXED (11 of 12 bills added)
3. No report language analysis - partially addressed
4. Hardcoded data with no update mechanism - FIXED (Python scripts created)
5. Incomplete FY2025 data - FIXED (all 12 bills both chambers)

**Round 2 feedback** (3 remaining priorities):
1. Senate data - COMPLETED
2. Report language directive extraction - identified as next priority
3. Update path credibility - scripts exist, timestamps visible

## What's Working Well
- Clean, professional interface that a Hill staffer would recognize as useful
- Real text diffs for bill version comparison
- Complete bicameral data for FY2025
- Immediate access to FY2026 committee documents not yet on Congress.gov
- CSV export for sharing data with colleagues

## Known Limitations
- Report language analysis (directive extraction, deadline tracking) is not yet implemented
- FY2026 Senate data not yet available (markups haven't started)
- Cross-chamber comparison (diffing House vs Senate versions of the same bill) could be added
- No automated update mechanism (scripts must be run manually)

## Technical Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework dependencies)
- **Data Collection**: Python scripts using Congress.gov API and requests library
- **Diff Generation**: Python difflib for pre-computed diffs, custom JS LCS algorithm for client-side
- **Hosting**: GitHub Pages (static site from /docs directory)
- **Data**: ~115 FY2026 committee PDFs, 23 FY2025 bill text versions (HTML), 5 pre-computed diffs

## Team

This project was completed by a single Claude Code instance, using specialized sub-agents for:
- **House Approps Scraper**: Visited all FY2026 markup pages and extracted document URLs
- **Congress.gov API Researcher**: Searched for and catalogued all FY2025 appropriations bills
- **Senate Data Researcher**: Found Senate FY2025 bill numbers and text versions
- **DC Agent (Daniel Schuman persona)**: Provided two rounds of critical feedback from the perspective of a professional appropriations tracker
