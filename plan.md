# Appropriations Bill Version Tracker - Implementation Plan

## Goal
Build a web application that tracks all versions of the 12 annual appropriations bills as they move through the legislative process, from subcommittee markup through final enactment. This addresses a real pain point: appropriations committee websites publish documents well before Congress.gov catches up.

## Architecture

### Data Layer (`collect_data.py`)
- **Congress.gov API**: Fetch bill metadata, text versions, amendments, actions, committee reports
- **House Appropriations Committee website**: Scrape markup pages for subcommittee/full committee documents
- **Senate Appropriations Committee website**: Same for Senate side
- Output: `data/bills.json` with structured data

### Web Application (`site/`)
- Single-page static application (HTML/CSS/JS, no framework dependencies)
- Deployable to GitHub Pages

### Features
1. **Bill Tracker Matrix**: Spreadsheet showing all 12 bills × legislative stages
   - Color-coded cells: green (document available), yellow (stage reached, document pending), gray (not yet)
   - Each cell links to the document

2. **Version Comparison**: Side-by-side diff viewer for comparing bill text across stages
   - Within-chamber comparison (e.g., subcommittee vs full committee)
   - Cross-chamber comparison (House vs Senate)

3. **Report Language Analyzer**:
   - Extract directives to agencies ("the Committee directs...", "shall report to...")
   - Extract deadlines ("within 90 days", "not later than...")
   - Show conflicting language between chambers

4. **Historical Tracker**: View same bill across multiple fiscal years

## The 12 Appropriations Bills
1. Agriculture, Rural Development, FDA
2. Commerce, Justice, Science
3. Defense
4. Energy and Water Development
5. Financial Services and General Government
6. Homeland Security
7. Interior, Environment
8. Labor, Health and Human Services, Education
9. Legislative Branch
10. Military Construction, Veterans Affairs
11. State, Foreign Operations
12. Transportation, Housing and Urban Development

## Legislative Stages (columns in the matrix)
1. Subcommittee Bill Text (as introduced)
2. Subcommittee Report/Summary
3. Subcommittee Amendments
4. Full Committee Bill Text
5. Full Committee Report Language
6. Full Committee Amendments
7. House Rules Committee (House only) - bill text before/after
8. Floor-Passed Bill Text (House)
9. Floor-Passed Bill Text (Senate)
10. Conference Report / Joint Explanatory Statement
11. Enacted Law

## Fiscal Years to Track
- FY2026 (119th Congress, current)
- FY2025 (118th Congress, recent)
- Earlier years for historical comparison

## Implementation Phases
1. Data collection script (Python)
2. Static web interface with matrix view
3. Document comparison features
4. Report language analysis
5. Polish and deploy
