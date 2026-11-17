# Work performed on JSON files

Changes applied while building and cleaning [`finalDataV2.json`](finalDataV2.json). Component scores and `Grade_*` / `Stars` values from the scorecard sources were kept (not recomputed), except where noted as structural or metadata fixes.

## File build / merge
- Created `finalDataV2.json` from `Final.scorecard.cah.json` (30) + `Final.scorecard.ncah.json` (90); preferred NEW scorecard fields over `finalData.json`
- Dropped 4 FinalData-only hospitals (Burke Medical Center; East Georgia Regional; Emory University Orthopaedics & Spine; Memorial Health Meadows)
- Kept NEW-only **Southern Regional Medical Center** (`110165`)
- Applied NEW name renames (Floyd → Atrium Health Floyd; Habersham → NGMC Habersham; Houston Perry/Warner Robins → Emory; Piedmont Hospital → Piedmont Hospital (Atlanta))
- Carried `lat` / `lng` / `hoursOperation` from `finalData.json` for 119 matched hospitals
- Geocoded Southern Regional via Nominatim + Overpass: `lat` 33.57933, `lng` -84.38959, `hoursOperation` `24/7`
- Schema uses CMS string `ID`, `MIUR_score` (not `Patient_Payer_Mix`), scored `CHNA_Score`, and `finalScore.Stars` alongside `Grade_Final`

## Coordinates
- **Saint Joseph's Hospital** (Savannah, ID `110043`): `lng` corrected from `81.15573` to `-81.15573` (sign flip). Lat and all scores unchanged.

## Websites
- Replaced non-URL Archbold page-title strings with FinalData URLs for:
  - Brooks County Hospital (`111332`)
  - Mitchell County Hospital (`111331`)
  - Grady General Hospital (`110121`)
  - John D. Archbold Memorial Hospital (`110038`)
- Stripped trailing NBSP (`\xa0`) from dirty website/name strings (e.g. Liberty Regional URL; Emory Hospital Perry; Wellstar Douglas)
- Upgraded `http://` → `https://` for:
  - Liberty Regional Medical Center
  - Warm Springs Medical Center

## Text / address / naming cleanup
- Bleckley Memorial: county `Bleckely` → `Bleckley`
- City of Hope: address `Parkwa` → `Parkway`
- St. Mary's Good Samaritan: address `Pwky` → `Pkwy`
- Atrium Health Navicent Peach: address `GA-247CONN` → `GA-247 CONN`
- **Wellstar Sylvan Grove Medical Center** (ID `111319`): spelling `WellStar` → `Wellstar` to match other Wellstar facilities and `systemName`
- **Blue Ridge Medical Center** (was ID `110189`): display name `Fannin Regional Hospital` → `Blue Ridge Medical Center` to match current public brand; kept `blueridgemc.org` website and independent (`systemName: null`)

## Field / type normalization
- Independent `systemName` placeholder `"0.0"` → `null` (36 hospitals)
- Cast flags to int: `hospitalSystem`, `areaType`, `hospitalAuthority`, `criticalAccess`
- Cast `zipcode` / `bedSize` to int; `lat` / `lng` to float; CMS `ID` kept as string
- Normalized stable key order across all 120 `hospitalInfo` and score blocks

## UI data wiring (related)
- App reads `finalDataV2.json`; final display/sort/map uses `Stars`; pillar headers use `Grade_*` fields

## Reference data (CCN verification)
- CMS Certification Number (CCN) reference export: [`Hospital_General_Information_2.csv`](Hospital_General_Information_2.csv) (also `F:\Hospital_General_Information_2.csv`)
- Join key: JSON `hospitalInfo.ID` ↔ CSV `Facility ID` (this is the CCN)
- Useful CSV columns: Facility Name, Address, City/Town, State, ZIP Code, County/Parish, Hospital Type
- Filter Georgia with `State = GA` (Georgia CCNs typically start with `11`)
- **Policy:** wrong or retired CCNs are corrected from this CSV when Facility Name + address match

## CCN corrections (from CMS CSV)
- **Blue Ridge Medical Center:** `110189` → `111338` (Critical Access Hospitals)
- **Irwin County Hospital:** `110130` → `110779` (Rural Emergency Hospital)
- **Taylor Regional Hospital:** `110135` → `110256` (Acute Care Hospitals)
- **Southeast Georgia Health System-Brunswick Campus** (`110025`): city/address/ZIP/county corrected from CSV (`Brunswick` / `2415 Parkwood Drive` / `31520` / `Glynn`); CCN unchanged; lat/lng already correct
- **Shared CCN `110079`:** Hughes Spalding and Grady Memorial both correctly use `110079` (Hughes Spalding bills under Grady’s Medicare number). Not remapped. Lookups by ID can still collide — prefer name key in UI.

---

# Known Quirks

Remaining open issues. Scores were not changed for these items.

## Classification and identity
- **Atrium Health Floyd Medical Center** is tagged as a **Critical Access Hospital (CAH)** but has about **227 beds**. CMS CSV lists it as Acute Care Hospitals (`110054`). Needs `criticalAccess` retag.
- **Other CAH vs CSV Hospital Type mismatches:** City of Hope (`110233`, Acute Care), AdventHealth Murray (`110050`, Acute Care), NGMC Lumpkin (`110237`, Acute Care), Piedmont McDuffie (`110111`, Acute Care) tagged CAH in JSON; Warm Springs (`111316`) is CAH in CSV but `criticalAccess=0` in JSON.
- **Shared CCN `110079`:** Children's Healthcare of Atlanta at Hughes Spalding and Grady Memorial Hospital both use `110079` by design (verified against CMS / state AHQ). ID-only lookups collide.
- **Hughes Spalding dual affiliation:** named **Children's Healthcare of Atlanta (CHOA)** but `systemName` is Grady. Grady-owned and CHOA-managed; product needs a clear system-label rule.
- **Not in Hospital General Information CSV** (specialty / LTACH / IRF / campus types; CCNs kept from other CMS sources): Shepherd Center (`112003`), Emory Long Term Acute Care (`112006`), Roosevelt LTAC (`112000`), Wellstar Windy Hill (`112007`), Roosevelt Warm Springs Rehab (`113028`), Atrium Navicent Rehab (`113029`), Emory Hospital Perry (`110153`).

## Brand, naming, and URLs
- **Piedmont McDuffie** and **Piedmont Augusta** still use old `universityhealth.org` transparency URLs while other Piedmont hospitals use `piedmont.org`.
- **Navicent names are inconsistent** under Atrium Health (e.g. “Navicent Health Baldwin”, “Atrium Navicent Health Rehabilitation Hospital”, “Atrium Health Navicent, Medical Center” vs the official “Atrium Health Navicent …” pattern).

## Sparse or incomplete-looking scores
- Some hospitals have many component scores of `0`, which may mean missing data rather than a true zero and pulls overall stars down (examples: Blue Ridge Medical Center; Irwin County; several South Georgia Medical Center campuses; Southern Regional).
- **Endowment Holdings = 0** for about half of hospitals (61 of 120). Confirm whether that means no endowment or missing data.
- Until a scoring policy is decided, these values stay as stored in the JSON.

---

# Next Steps

Prioritized actions for review and follow-up (do not change scores without a source decision):

1. **Retag `criticalAccess` from CMS Hospital Type** — Floyd, City of Hope, Murray, Lumpkin, McDuffie → not CAH; Warm Springs → CAH.
2. **ID-safe lookups for shared `110079`** — Prefer hospital name (or composite key) where Grady and Hughes Spalding must not collide.
3. **Decide Hughes Spalding system label** — Grady (ownership) vs Children's Healthcare of Atlanta (CHOA) (brand/management) for `systemName`.
4. **Update Piedmont transparency URLs** — Point Piedmont McDuffie and Piedmont Augusta to current `piedmont.org` hospital-transparency pages.
5. **Normalize Navicent display names** — Use the official “Atrium Health Navicent …” pattern for Baldwin, The Medical Center, and Rehabilitation Hospital.
6. **Decide zero vs missing scores** — Before changing sparse hospitals, set a policy for whether `0` means scored zero or “not available,” especially for endowment and community-benefit components.
