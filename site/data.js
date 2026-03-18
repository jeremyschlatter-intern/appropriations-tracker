// Appropriations Bill Version Tracker - Data
// Last updated: 2026-03-18

const APPROPRIATIONS_DATA = {
  fiscalYears: {
    2026: {
      congress: 119,
      session: "1st",
      lastUpdated: "2026-03-18",
      status: "House markups complete; bills not yet introduced on Congress.gov",
      notes: "FY2026 appropriations bills have been marked up in House subcommittee and full committee but have not yet been formally introduced as numbered bills in the 119th Congress. Documents are available from the House Appropriations Committee website.",
      bills: [
        {
          id: "milcon-va",
          shortName: "MilCon-VA",
          fullName: "Military Construction, Veterans Affairs, and Related Agencies",
          subcommitteeCode: "AP18",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-06-05",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP18/20250605/118354/BILLS-119--AP-FY2026-MilCon.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-milcon-va-bill-summary-final.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP18/20250605/118354/HMKP-119-AP18-20250605-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-06-10",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250610/118381/BILLS-119-FC-AP-FY2026-AP00-FY26MilConVaFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-milcon-va-bill-full-committee-summary.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250610/118381/HMKP-119-AP00-20250610-SD003.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-06-10",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250610/118381/HMKP-119-AP00-20250610-SD006.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250610/118381/HMKP-119-AP00-20250610-SD005.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-06-10",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250610/118381/HMKP-119-AP00-20250610-SD003.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "agriculture",
          shortName: "Agriculture",
          fullName: "Agriculture, Rural Development, Food and Drug Administration, and Related Agencies",
          subcommitteeCode: "AP01",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-06-05",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP01/20250605/118353/BILLS-119-SC-AP-FY2026-Agriculture-FY26AgricultureSubcommittee.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-ag-bill-summary-final.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP01/20250605/118353/HMKP-119-AP01-20250605-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-06-23",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/BILLS-119-FC-AP-FY2026-AP00-FY26AgricultureFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-ag-bill-summary-final-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-06-23",
              documents: [
                { type: "amendments", label: "Amendments (First Tranche)", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD004.pdf", format: "pdf" },
                { type: "amendments", label: "Amendments (Second Tranche)", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD005.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes (First)", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes (Second)", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD006.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-06-23",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250611/118388/HMKP-119-AP00-20250611-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "homeland",
          shortName: "Homeland Security",
          fullName: "Department of Homeland Security",
          subcommitteeCode: "AP15",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-06-09",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP15/20250609/118367/BILLS-119-SC-AP-FY2026-HSecurity.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-homeland-security-bill-summary.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP15/20250609/118367/HMKP-119-AP15-20250609-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-06-24",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250624/118429/BILLS-119-FC-AP-FY2026-AP00-FY26HomelandFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-homeland-security-bill-summary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250624/118429/HMKP-119-AP00-20250624-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-06-24",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250624/118429/HMKP-119-AP00-20250624-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250624/118429/HMKP-119-AP00-20250624-SD004.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-06-24",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250624/118429/HMKP-119-AP00-20250624-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "defense",
          shortName: "Defense",
          fullName: "Department of Defense",
          subcommitteeCode: "AP02",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-06-10",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP02/20250610/118380/BILLS-119-SC-AP-FY2026-Defense.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-defense-bill-summary.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-06-12",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250612/118389/BILLS-119-FC-AP-FY2026-AP00-FY26DefenseFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-defense-bill-summary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250612/118389/HMKP-119-AP00-20250612-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-06-12",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250612/118389/HMKP-119-AP00-20250612-SD005.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250612/118389/HMKP-119-AP00-20250612-SD006.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-06-12",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250612/118389/HMKP-119-AP00-20250612-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "legislative-branch",
          shortName: "Leg Branch",
          fullName: "Legislative Branch",
          subcommitteeCode: "AP24",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-06-23",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-legislative-branch-subcommittee-mark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-leg-branch-bill-subcommittee-summary.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-06-26",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250626/118431/BILLS-119-FC-AP-FY2026-AP00-FY26LegBranchFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-leg-branch-bill-full-committee-summary.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250626/118431/HMKP-119-AP00-20250626-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-06-26",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250626/118431/HMKP-119-AP00-20250626-SD004.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250626/118431/HMKP-119-AP00-20250626-SD005.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-06-26",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250626/118431/HMKP-119-AP00-20250626-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "thud",
          shortName: "THUD",
          fullName: "Transportation, Housing and Urban Development, and Related Agencies",
          subcommitteeCode: "AP20",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-14",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP20/20250714/118503/BILLS-119--AP--TransHUD-FY26THUDAppropriationsBill.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-thud-bill-summary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP20/20250714/118503/HMKP-119-AP20-20250714-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/BILLS-119-FC-AP-FY2026-AP00-FY26THUDFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-thud-bill-summary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD002.PDF", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD005.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD007.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD002.PDF", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "energy-water",
          shortName: "Energy & Water",
          fullName: "Energy and Water Development and Related Agencies",
          subcommitteeCode: "AP10",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-14",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP10/20250714/118479/BILLS-119--AP-FY2026-EnergyWater.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-energy-water-bill-summary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP10/20250714/118479/CRPT-119-AP10-Vote001-20250714.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/BILLS-119-FC-AP-FY2026-AP00-FY26EnergyWaterFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-energy-water-bill-summary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD003.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD006.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD008.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-07-17",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250717/118505/HMKP-119-AP00-20250717-SD003.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "interior",
          shortName: "Interior-Env",
          fullName: "Interior, Environment, and Related Agencies",
          subcommitteeCode: "AP06",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-15",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP06/20250715/118507/BILLS-119-SC-AP-FY2026-Interior-FY26InteriorEnvironmentandRelatedAgenciesBill.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-interior%2C-environment%2C-and-related-agencies-bill-sumnmary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP06/20250715/118507/HMKP-119-AP06-20250715-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-07-22",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250722/118542/BILLS-119-FC-AP-FY2026-AP00-FY26InteriorFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-interior-environment-and-related-agencies-bill-sumnmary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250722/118542/HMKP-119-AP00-20250722-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-07-22",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250722/118542/HMKP-119-AP00-20250722-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250722/118542/HMKP-119-AP00-20250722-SD004.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-07-22",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250722/118542/HMKP-119-AP00-20250722-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "state-foreign-ops",
          shortName: "State-ForeignOps",
          fullName: "National Security, Department of State, and Related Programs",
          subcommitteeCode: "AP04",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-15",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP04/20250715/118506/BILLS-119-SC-AP-FY2026-StateForOp.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-national-security%2C-department-of-state%2C-and-related-programs-bill-summary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP04/20250715/118506/HMKP-119-AP04-20250715-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-07-23",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250723/118543/BILLS-119-SC-AP-FY2026-AP00-FY26NSRPFullCommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-national-security-department-of-state-and-related-programs-bill-summary-full-committee.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250723/118543/HMKP-119-AP00-20250723-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-07-23",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250723/118543/HMKP-119-AP00-20250723-SD003.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-07-23",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250723/118543/HMKP-119-AP00-20250723-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "cjs",
          shortName: "CJS",
          fullName: "Commerce, Justice, Science, and Related Agencies",
          subcommitteeCode: "AP19",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-15",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP19/20250715/118504/BILLS-119-SC-AP-FY2026-CJS-FY26CommerceJusticeScienceandRelatedAgencies-SubcommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-commerce%2C-justice%2C-science%2C-and-related-agencies-bill-summary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP19/20250715/118504/HMKP-119-AP19-20250715-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-09-10",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250910/118544/BILLS-119-FC-AP-FY2026-AP00-FY26CJSFullCommitteeMark.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250910/118544/HMKP-119-AP00-20250910-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-09-10",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250910/118544/HMKP-119-AP00-20250910-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250910/118544/HMKP-119-AP00-20250910-SD004.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-09-10",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250910/118544/HMKP-119-AP00-20250910-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "fsgg",
          shortName: "FSGG",
          fullName: "Financial Services and General Government",
          subcommitteeCode: "AP23",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-07-21",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP23/20250721/118534/BILLS-119-SC-AP-FY2026-FServices-FY26FSGGSubcommitteeMark.pdf", format: "pdf" },
                { type: "summary", label: "Bill Summary", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/fy26-financial-services-and-general-government-bill-summary-subcommittee.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP23/20250721/118534/HMKP-119-AP23-20250721-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-09-03",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250903/118571/BILLS-119-FC-AP-FY2026-AP00-FY26FSGGFullCommitteeMark.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250903/118571/HMKP-119-AP00-20250903-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-09-03",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250903/118571/HMKP-119-AP00-20250903-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250903/118571/HMKP-119-AP00-20250903-SD004.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-09-03",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250903/118571/HMKP-119-AP00-20250903-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "lhhs",
          shortName: "Labor-HHS",
          fullName: "Labor, Health and Human Services, Education, and Related Agencies",
          subcommitteeCode: "AP07",
          congressGovBillNumber: null,
          stages: {
            subcommittee_bill: {
              available: true,
              date: "2025-09-02",
              documents: [
                { type: "bill_text", label: "Subcommittee Mark", url: "https://docs.house.gov/meetings/AP/AP07/20250902/118570/BILLS-119-SC-AP-FY2026-LaborHHS-FY26LaborHealthandHumanServicesEducationandRelatedAgencies-SubcommitteeMark.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP07/20250902/118570/HMKP-119-AP07-20250902-SD002.pdf", format: "pdf" }
              ]
            },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2025-09-09",
              documents: [
                { type: "bill_text", label: "Full Committee Mark", url: "https://docs.house.gov/meetings/AP/AP00/20250909/118593/BILLS-119-FC-AP-FY2026-AP00-FY26LHHSFullCommitteeMark.pdf", format: "pdf" },
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250909/118593/HMKP-119-AP00-20250909-SD002.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2025-09-09",
              documents: [
                { type: "amendments", label: "Amendments", url: "https://docs.house.gov/meetings/AP/AP00/20250909/118593/HMKP-119-AP00-20250909-SD003.pdf", format: "pdf" },
                { type: "roll_call", label: "Roll Call Votes", url: "https://docs.house.gov/meetings/AP/AP00/20250909/118593/HMKP-119-AP00-20250909-SD004.pdf", format: "pdf" }
              ]
            },
            full_committee_report: {
              available: true,
              date: "2025-09-09",
              documents: [
                { type: "report", label: "Committee Report", url: "https://docs.house.gov/meetings/AP/AP00/20250909/118593/HMKP-119-AP00-20250909-SD002.pdf", format: "pdf" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        }
      ]
    },
    2025: {
      congress: 118,
      session: "2nd",
      lastUpdated: "2026-03-18",
      status: "House bills reported; 5 passed House; none enacted as standalone",
      notes: "All 12 FY2025 appropriations bills were reported by the House Appropriations Committee. 5 passed the House. 4 reached the Senate calendar. The Legislative Branch bill failed on the House floor 205-213. None were enacted as standalone measures; the government operated under continuing resolutions.",
      bills: [
        {
          id: "milcon-va",
          shortName: "MilCon-VA",
          fullName: "Military Construction, Veterans Affairs, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 8580",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8580",
          sponsor: "Rep. John Carter (R-TX)",
          committeeReport: "H. Rept. 118-528",
          stages: {
            subcommittee_bill: { available: true, date: "2024-05-28", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-05-28",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8580/BILLS-118hr8580rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8580/BILLS-118hr8580rh.pdf", format: "pdf" },
                { type: "bill_text", label: "Reported in House (XML)", url: "https://www.congress.gov/118/bills/hr8580/BILLS-118hr8580rh.xml", format: "xml" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-06-05",
              documents: [
                { type: "amendments", label: "31 amendments (nearly all passed)", url: "https://www.congress.gov/bill/118th-congress/house-bill/8580/amendments", format: "link" }
              ],
              summary: "31 amendments. Key: AI for VA claims processing +$1M (passed 333-70), prohibit VA bonuses for senior executives (passed 237-169), medical marijuana for VA patients (passed 290-116)."
            },
            full_committee_report: {
              available: true,
              date: "2024-05-28",
              documents: [
                { type: "report", label: "H. Rept. 118-528", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/528", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: true,
              date: "2024-06-05",
              vote: "209-197",
              documents: [
                { type: "bill_text", label: "Engrossed in House (HTM)", url: "https://www.congress.gov/118/bills/hr8580/BILLS-118hr8580eh.htm", format: "htm" },
                { type: "bill_text", label: "Engrossed in House (PDF)", url: "https://www.congress.gov/118/bills/hr8580/BILLS-118hr8580eh.pdf", format: "pdf" }
              ]
            },
            senate_passed: { available: false, note: "Placed on Senate Calendar No. 506 (9/12/2024), no floor vote" },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "defense",
          shortName: "Defense",
          fullName: "Department of Defense Appropriations Act, 2025",
          congressGovBillNumber: "HR 8774",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8774",
          sponsor: "Rep. Ken Calvert (R-CA-41)",
          committeeReport: "H. Rept. 118-557",
          stages: {
            subcommittee_bill: { available: true, date: "2024-06-17", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8774/BILLS-118hr8774rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8774/BILLS-118hr8774rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-06-28",
              documents: [
                { type: "amendments", label: "15 amendments (incl. en bloc)", url: "https://www.congress.gov/bill/118th-congress/house-bill/8774/amendments", format: "link" }
              ],
              summary: "15 amendments including 5 en bloc packages. Key: greenhouse gas disclosure rule block (passed 211-199), eliminate Ukraine funding (failed 76-335)."
            },
            full_committee_report: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "report", label: "H. Rept. 118-557", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/557", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: true,
              date: "2024-06-28",
              vote: "217-198",
              documents: [
                { type: "bill_text", label: "Engrossed in House (HTM)", url: "https://www.congress.gov/118/bills/hr8774/BILLS-118hr8774eh.htm", format: "htm" },
                { type: "bill_text", label: "Engrossed in House (PDF)", url: "https://www.congress.gov/118/bills/hr8774/BILLS-118hr8774eh.pdf", format: "pdf" }
              ]
            },
            senate_passed: { available: false, note: "Placed on Senate Calendar No. 508 (9/12/2024), no floor vote" },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "homeland",
          shortName: "Homeland Security",
          fullName: "Department of Homeland Security Appropriations Act, 2025",
          congressGovBillNumber: "HR 8752",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8752",
          sponsor: "Rep. Mark Amodei (R-NV-2)",
          committeeReport: "H. Rept. 118-553",
          stages: {
            subcommittee_bill: { available: true, date: "2024-06-14", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-06-14",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8752/BILLS-118hr8752rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8752/BILLS-118hr8752rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-06-28",
              documents: [
                { type: "amendments", label: "31 amendments", url: "https://www.congress.gov/bill/118th-congress/house-bill/8752/amendments", format: "link" }
              ],
              summary: "31 amendments (19 passed, 10 failed). Key: reduce DHS Secretary salary to $1 (passed 193-173), prohibit DHS family unity process (failed 193-216)."
            },
            full_committee_report: {
              available: true,
              date: "2024-06-14",
              documents: [
                { type: "report", label: "H. Rept. 118-553", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/553", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: true,
              date: "2024-06-28",
              vote: "212-203",
              documents: [
                { type: "bill_text", label: "Engrossed in House (HTM)", url: "https://www.congress.gov/118/bills/hr8752/BILLS-118hr8752eh.htm", format: "htm" },
                { type: "bill_text", label: "Engrossed in House (PDF)", url: "https://www.congress.gov/118/bills/hr8752/BILLS-118hr8752eh.pdf", format: "pdf" }
              ]
            },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "interior",
          shortName: "Interior-Env",
          fullName: "Department of the Interior, Environment, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 8998",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8998",
          sponsor: "Rep. Mike Simpson (R-ID)",
          committeeReport: "H. Rept. 118-581",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-11", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8998/BILLS-118hr8998rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8998/BILLS-118hr8998rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-07-24",
              documents: [
                { type: "amendments", label: "50 amendments", url: "https://www.congress.gov/bill/118th-congress/house-bill/8998/amendments", format: "link" }
              ],
              summary: "50 amendments (31 passed). Key: prohibit environmental justice activities (passed 210-204), prohibit DEI programs (passed 211-202)."
            },
            full_committee_report: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "report", label: "H. Rept. 118-581", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/581", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: true,
              date: "2024-07-24",
              vote: "210-205",
              documents: [
                { type: "bill_text", label: "Engrossed in House (HTM)", url: "https://www.congress.gov/118/bills/hr8998/BILLS-118hr8998eh.htm", format: "htm" },
                { type: "bill_text", label: "Engrossed in House (PDF)", url: "https://www.congress.gov/118/bills/hr8998/BILLS-118hr8998eh.pdf", format: "pdf" }
              ]
            },
            senate_passed: { available: false, note: "Placed on Senate Calendar No. 509 (9/12/2024), no floor vote" },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "state-foreign-ops",
          shortName: "State-ForeignOps",
          fullName: "Department of State, Foreign Operations, and Related Programs Appropriations Act, 2025",
          congressGovBillNumber: "HR 8771",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8771",
          sponsor: "Rep. Mario Diaz-Balart (R-FL-26)",
          committeeReport: "H. Rept. 118-554",
          stages: {
            subcommittee_bill: { available: true, date: "2024-06-14", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-06-14",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8771/BILLS-118hr8771rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8771/BILLS-118hr8771rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-06-28",
              documents: [
                { type: "amendments", label: "38 amendments", url: "https://www.congress.gov/bill/118th-congress/house-bill/8771/amendments", format: "link" }
              ],
              summary: "38 amendments (~18 passed). Key: prohibit Ukraine funding (failed 70-342), prohibit Gaza pier support (passed 209-200)."
            },
            full_committee_report: {
              available: true,
              date: "2024-06-14",
              documents: [
                { type: "report", label: "H. Rept. 118-554", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/554", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: true,
              date: "2024-06-28",
              vote: "212-200",
              documents: [
                { type: "bill_text", label: "Engrossed in House (HTM)", url: "https://www.congress.gov/118/bills/hr8771/BILLS-118hr8771eh.htm", format: "htm" },
                { type: "bill_text", label: "Engrossed in House (PDF)", url: "https://www.congress.gov/118/bills/hr8771/BILLS-118hr8771eh.pdf", format: "pdf" }
              ]
            },
            senate_passed: { available: false, note: "Placed on Senate Calendar No. 507 (9/12/2024), no floor vote" },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "legislative-branch",
          shortName: "Leg Branch",
          fullName: "Legislative Branch Appropriations Act, 2025",
          congressGovBillNumber: "HR 8772",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8772",
          sponsor: "House Appropriations Committee",
          committeeReport: "H. Rept. 118-555",
          stages: {
            subcommittee_bill: { available: true, date: "2024-06-17", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8772/BILLS-118hr8772rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8772/BILLS-118hr8772rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "amendments", label: "4 amendments", url: "https://www.congress.gov/bill/118th-congress/house-bill/8772/amendments", format: "link" }
              ],
              summary: "4 amendments. COVID mask mandate prohibition (passed). Defund Congressional Office for International Leadership (failed)."
            },
            full_committee_report: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "report", label: "H. Rept. 118-555", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/555", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: {
              available: false,
              date: "2024-07-11",
              note: "FAILED 205-213",
              vote: "205-213 (failed)"
            },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "fsgg",
          shortName: "FSGG",
          fullName: "Financial Services and General Government Appropriations Act, 2025",
          congressGovBillNumber: "HR 8773",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8773",
          sponsor: "Rep. David Joyce (R-OH)",
          committeeReport: "H. Rept. 118-556",
          stages: {
            subcommittee_bill: { available: true, date: "2024-06-17", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8773/BILLS-118hr8773rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8773/BILLS-118hr8773rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: { available: false },
            full_committee_report: {
              available: true,
              date: "2024-06-17",
              documents: [
                { type: "report", label: "H. Rept. 118-556", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/556", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Never reached House floor" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "energy-water",
          shortName: "Energy & Water",
          fullName: "Energy and Water Development and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 8997",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/8997",
          sponsor: "Rep. Chuck Fleischmann (R-TN)",
          committeeReport: "H. Rept. 118-580",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-11", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr8997/BILLS-118hr8997rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr8997/BILLS-118hr8997rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: {
              available: true,
              date: "2024-07-23",
              documents: [
                { type: "amendments", label: "36 amendments", url: "https://www.congress.gov/bill/118th-congress/house-bill/8997/amendments", format: "link" }
              ],
              summary: "36 amendments (20 passed). Key: defund American Climate Corps (passed 199-197), redirect $10M from renewable to cybersecurity (passed 214-203)."
            },
            full_committee_report: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "report", label: "H. Rept. 118-580", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/580", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Floor debate held 7/23/2024 with 30+ amendments; proceedings postponed, no final vote" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "agriculture",
          shortName: "Agriculture",
          fullName: "Agriculture, Rural Development, Food and Drug Administration, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 9027",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/9027",
          sponsor: "Rep. Andy Harris (R-MD-1)",
          committeeReport: "H. Rept. 118-583",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-12", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr9027/BILLS-118hr9027rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr9027/BILLS-118hr9027rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: { available: false },
            full_committee_report: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "report", label: "H. Rept. 118-583", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/583", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Never reached House floor" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "cjs",
          shortName: "CJS",
          fullName: "Commerce, Justice, Science, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 9026",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/9026",
          sponsor: "Rep. Harold Rogers (R-KY)",
          committeeReport: "H. Rept. 118-582",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-11", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr9026/BILLS-118hr9026rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr9026/BILLS-118hr9026rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: { available: false },
            full_committee_report: {
              available: true,
              date: "2024-07-11",
              documents: [
                { type: "report", label: "H. Rept. 118-582", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/582", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Never reached House floor" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "lhhs",
          shortName: "Labor-HHS",
          fullName: "Departments of Labor, Health and Human Services, and Education, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 9029",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/9029",
          sponsor: "Rep. Robert Aderholt (R-AL)",
          committeeReport: "H. Rept. 118-585",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-12", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr9029/BILLS-118hr9029rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr9029/BILLS-118hr9029rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: { available: false },
            full_committee_report: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "report", label: "H. Rept. 118-585", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/585", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Never reached House floor" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        },
        {
          id: "thud",
          shortName: "THUD",
          fullName: "Transportation, Housing and Urban Development, and Related Agencies Appropriations Act, 2025",
          congressGovBillNumber: "HR 9028",
          congressGovUrl: "https://www.congress.gov/bill/118th-congress/house-bill/9028",
          sponsor: "Rep. Steve Womack (R-AR)",
          committeeReport: "H. Rept. 118-584",
          stages: {
            subcommittee_bill: { available: true, date: "2024-07-12", inferredFromIntroduction: true },
            subcommittee_amendments: { available: false },
            full_committee_bill: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "bill_text", label: "Reported in House (HTM)", url: "https://www.congress.gov/118/bills/hr9028/BILLS-118hr9028rh.htm", format: "htm" },
                { type: "bill_text", label: "Reported in House (PDF)", url: "https://www.congress.gov/118/bills/hr9028/BILLS-118hr9028rh.pdf", format: "pdf" }
              ]
            },
            full_committee_amendments: { available: false },
            full_committee_report: {
              available: true,
              date: "2024-07-12",
              documents: [
                { type: "report", label: "H. Rept. 118-584", url: "https://www.congress.gov/congressional-report/118th-congress/house-report/584", format: "link" }
              ]
            },
            house_rules: { available: false },
            house_passed: { available: false, note: "Never reached House floor" },
            senate_passed: { available: false },
            conference_report: { available: false },
            enacted: { available: false }
          }
        }
      ]
    }
  },
  // Stage definitions for display
  stageDefinitions: [
    { id: "subcommittee_bill", label: "Subcommittee Bill Text", shortLabel: "Subcom. Bill", description: "Bill text as introduced/marked up in subcommittee" },
    { id: "subcommittee_amendments", label: "Subcommittee Amendments", shortLabel: "Subcom. Amdts", description: "Amendments offered and adopted at subcommittee" },
    { id: "full_committee_bill", label: "Full Committee Bill Text", shortLabel: "Full Com. Bill", description: "Bill text as adopted by the full committee" },
    { id: "full_committee_amendments", label: "Full Committee Amendments", shortLabel: "Full Com. Amdts", description: "Amendments offered at full committee, whether adopted or not" },
    { id: "full_committee_report", label: "Committee Report Language", shortLabel: "Com. Report", description: "Report language as published by the committee" },
    { id: "house_rules", label: "House Rules Committee", shortLabel: "Rules Com.", description: "Bill text after consideration by the House Rules Committee" },
    { id: "house_passed", label: "Passed House", shortLabel: "House Passed", description: "Bill text as adopted by the House" },
    { id: "senate_passed", label: "Passed Senate", shortLabel: "Senate Passed", description: "Bill text as adopted by the Senate" },
    { id: "conference_report", label: "Conference Report", shortLabel: "Conference", description: "Joint explanatory statement accompanying the final bill" },
    { id: "enacted", label: "Enacted", shortLabel: "Enacted", description: "Bill as signed into law" }
  ],
  // Reference documents
  referenceDocuments: {
    2026: [
      { label: "Committee Jurisdiction (119th)", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/119-jurisdiction.pdf" },
      { label: "Committee Rules (119th)", url: "https://appropriations.house.gov/sites/evo-subsites/republicans-appropriations.house.gov/files/evo-media-document/119th-rules.pdf" }
    ]
  }
};
