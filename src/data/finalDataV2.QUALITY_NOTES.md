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
- **Blue Ridge Medical Center** (ID `110189`): display name `Fannin Regional Hospital` → `Blue Ridge Medical Center` to match current public brand; kept `blueridgemc.org` website and independent (`systemName: null`)

## Field / type normalization
- Independent `systemName` placeholder `"0.0"` → `null` (36 hospitals)
- Cast flags to int: `hospitalSystem`, `areaType`, `hospitalAuthority`, `criticalAccess`
- Cast `zipcode` / `bedSize` to int; `lat` / `lng` to float; CMS `ID` kept as string
- Normalized stable key order across all 120 `hospitalInfo` and score blocks

## UI data wiring (related)
- App reads `finalDataV2.json`; final display/sort/map uses `Stars`; pillar headers use `Grade_*` fields

## Reference data (CCN verification)
- CMS Certification Number (CCN) reference export: `F:\Hospital_General_Information_2.csv` (CMS Hospital General Information)
- Join key: JSON `hospitalInfo.ID` ↔ CSV `Facility ID` (this is the CCN)
- Useful CSV columns for review: Facility Name, Address, City/Town, State, ZIP Code, County/Parish, Hospital Type
- Filter Georgia with `State = GA` (Georgia CCNs typically start with `11`)
- **Policy:** CCNs / `hospitalInfo.ID` values in `finalDataV2.json` are **not modified** from this reference (review only)

---

# Known Quirks

Remaining open issues. Scores were not changed for these items. **CCNs are frozen** — including known ID quirks below — pending a future business decision; use `F:\Hospital_General_Information_2.csv` to review only.

## Classification and identity
- **Atrium Health Floyd Medical Center** is tagged as a **Critical Access Hospital (CAH)** but has about **227 beds**. CAH status is meant for small rural hospitals (typically ~25 beds). This looks misclassified and needs confirmation against the official CAH list / Hospital Type in the CMS CSV.
- **Other possible CAH mismatches** (tagged CAH with more than 25 beds): City of Hope Cancer Center (50), Blue Ridge Medical Center (50; formerly Fannin Regional), AdventHealth Murray (29). Verify each against CMS Hospital Type (do not change CCNs).
- **Duplicate hospital ID `110079`:** both Children's Healthcare of Atlanta at Hughes Spalding and Grady Memorial Hospital use the same ID. Lookups by ID can collide. CCN left unchanged.
- **Blue Ridge Medical Center** keeps CCN `110189` (former Fannin Regional ID); CMS may list a newer active Facility ID — documented for review only; CCN not updated.
- **Hughes Spalding dual affiliation:** the hospital is named **Children's Healthcare of Atlanta (CHOA)** but `systemName` is Grady. In reality it is Grady-owned and CHOA-managed; the product needs a clear rule for which system label to show. Transparency docs currently point at Grady’s site.

## Brand, naming, and URLs
- **Piedmont McDuffie** and **Piedmont Augusta** still use old `universityhealth.org` transparency URLs while other Piedmont hospitals use `piedmont.org`.
- **Navicent names are inconsistent** under Atrium Health (e.g. “Navicent Health Baldwin”, “Atrium Navicent Health Rehabilitation Hospital”, “Atrium Health Navicent, Medical Center” vs the official “Atrium Health Navicent …” pattern).

## Sparse or incomplete-looking scores
- Some hospitals have many component scores of `0`, which may mean missing data rather than a true zero and pulls overall stars down (examples: Blue Ridge Medical Center; Irwin County; several South Georgia Medical Center campuses; Southern Regional).
- **Endowment Holdings = 0** for about half of hospitals (61 of 120). Confirm whether that means no endowment or missing data.
- Until a scoring policy is decided, these values stay as stored in the JSON.

---

# Next Steps

Prioritized actions for review and follow-up (do not change scores without a source decision; **do not change CCNs** unless explicitly approved later):

1. **Review against CMS CSV** — Compare `finalDataV2.json` IDs to `F:\Hospital_General_Information_2.csv` (`Facility ID`) for name/city/Hospital Type mismatches; produce a review report if needed, without editing JSON IDs.
2. **Verify CAH tags** — Check Floyd and the other oversized Critical Access Hospital (CAH) rows against CMS Hospital Type / official CAH list; retag `criticalAccess` if wrong (CCNs stay as-is unless separately approved).
3. **Decide policy for duplicate ID `110079`** — Unique IDs vs documented affiliate/shared-ID rule (no CCN edit until decided).
4. **Decide Hughes Spalding system label** — Choose Grady (ownership) vs Children's Healthcare of Atlanta (CHOA) (brand/management) for `systemName`, and document the decision.
5. **Update Piedmont transparency URLs** — Point Piedmont McDuffie and Piedmont Augusta to current `piedmont.org` hospital-transparency pages.
6. **Normalize Navicent display names** — Use the official “Atrium Health Navicent …” pattern for Baldwin, The Medical Center, and Rehabilitation Hospital.
7. **Decide zero vs missing scores** — Before changing sparse hospitals, set a policy for whether `0` means scored zero or “not available,” especially for endowment and community-benefit components.
