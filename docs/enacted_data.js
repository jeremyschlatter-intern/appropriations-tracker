// FY2026 Enacted Appropriations Data
// FY2026 was funded through 3 package bills, not 12 individual bills.
// DHS remains unfunded (on continuing resolution).

const FY2026_ENACTED_DATA = {
  packages: [
    {
      billNumber: "H.R. 5371",
      title: "Continuing Appropriations, Agriculture, Legislative Branch, Military Construction and Veterans Affairs, and Extensions Act, 2026",
      publicLaw: "P.L. 119-37",
      signedDate: "2025-11-12",
      url: "https://www.congress.gov/bill/119th-congress/house-bill/5371",
      enrolledPdf: "https://www.congress.gov/119/bills/hr5371/BILLS-119hr5371enr.pdf",
      publicLawPdf: "https://www.congress.gov/119/plaws/publ37/PLAW-119publ37.pdf",
      bills: ["milcon-va", "agriculture", "legislative-branch"],
      note: "Full-year funding for Agriculture, Legislative Branch, and MilCon/VA; CR for remaining agencies"
    },
    {
      billNumber: "H.R. 6938",
      title: "Commerce, Justice, Science; Energy and Water Development; and Interior and Environment Appropriations Act, 2026",
      publicLaw: "P.L. 119-74",
      signedDate: "2026-01-23",
      url: "https://www.congress.gov/bill/119th-congress/house-bill/6938",
      enrolledPdf: "https://www.congress.gov/119/bills/hr6938/BILLS-119hr6938enr.pdf",
      publicLawPdf: "https://www.congress.gov/119/plaws/publ74/PLAW-119publ74.pdf",
      senateVote: "82-15",
      houseVote: "397-28",
      bills: ["cjs", "energy-water", "interior"],
      note: "3-bill minibus"
    },
    {
      billNumber: "H.R. 7148",
      title: "Consolidated Appropriations Act, 2026",
      publicLaw: "P.L. 119-75",
      signedDate: "2026-02-03",
      url: "https://www.congress.gov/bill/119th-congress/house-bill/7148",
      enrolledPdf: "https://www.congress.gov/119/bills/hr7148/BILLS-119hr7148enr.pdf",
      senateVote: "71-29",
      houseVote: "217-214",
      bills: ["defense", "fsgg", "lhhs", "state-foreign-ops", "thud"],
      note: "5-bill omnibus"
    }
  ],
  unfunded: ["homeland"] // DHS remains on CR
};
