# finalDataV2 Quality Notes

Values below were **retained as-is** in [`finalDataV2.json`](finalDataV2.json). Do not treat this file as authorization to change scores.

## Corrected

Changes applied while building/cleaning [`finalDataV2.json`](finalDataV2.json). Component scores and `Grade_*` / `Stars` values from the scorecard sources were kept (not recomputed), except where noted as structural/metadata fixes.

### File build / merge
- Created `finalDataV2.json` from `Final.scorecard.cah.json` (30) + `Final.scorecard.ncah.json` (90); preferred NEW scorecard fields over `finalData.json`
- Dropped 4 FinalData-only hospitals (Burke Medical Center; East Georgia Regional; Emory University Orthopaedics & Spine; Memorial Health Meadows)
- Kept NEW-only **Southern Regional Medical Center** (`110165`)
- Applied NEW name renames (Floyd → Atrium Health Floyd; Habersham → NGMC Habersham; Houston Perry/Warner Robins → Emory; Piedmont Hospital → Piedmont Hospital (Atlanta))
- Carried `lat` / `lng` / `hoursOperation` from `finalData.json` for 119 matched hospitals
- Geocoded Southern Regional via Nominatim + Overpass: `lat` 33.57933, `lng` -84.38959, `hoursOperation` `24/7`
- Schema uses CMS string `ID`, `MIUR_score` (not `Patient_Payer_Mix`), scored `CHNA_Score`, and `finalScore.Stars` alongside `Grade_Final`

### Coordinates
- **Saint Joseph's Hospital** (Savannah, ID `110043`): `lng` corrected from `81.15573` to `-81.15573` (sign flip). Lat and all scores unchanged.

### Websites
- Replaced non-URL Archbold page-title strings with FinalData URLs for:
  - Brooks County Hospital (`111332`)
  - Mitchell County Hospital (`111331`)
  - Grady General Hospital (`110121`)
  - John D. Archbold Memorial Hospital (`110038`)
- Stripped trailing NBSP (`\xa0`) from dirty website/name strings (e.g. Liberty Regional URL; Emory Hospital Perry; Wellstar Douglas)
- Upgraded `http://` → `https://` for:
  - Liberty Regional Medical Center
  - Warm Springs Medical Center

### Text / address cleanup
- Bleckley Memorial: county `Bleckely` → `Bleckley`
- City of Hope: address `Parkwa` → `Parkway`
- St. Mary's Good Samaritan: address `Pwky` → `Pkwy`
- Atrium Health Navicent Peach: address `GA-247CONN` → `GA-247 CONN`

### Field / type normalization
- Independent `systemName` placeholder `"0.0"` → `null` (36 hospitals)
- Cast flags to int: `hospitalSystem`, `areaType`, `hospitalAuthority`, `criticalAccess`
- Cast `zipcode` / `bedSize` to int; `lat` / `lng` to float; CMS `ID` kept as string
- Normalized stable key order across all 120 `hospitalInfo` and score blocks

## Duplicate CMS ID

- **`110079`** used twice:
  - Children's Healthcare of Atlanta at Hughes Spalding (24 beds, `systemName: Grady`)
  - Grady Memorial Hospital (953 beds, `systemName: Grady`)

## CAH with bedSize > 25 (`criticalAccess: 1`)

| Name | ID | Beds | sizeGroup |
|------|-----|------|-----------|
| Atrium Health Floyd Medical Center | 110054 | 227 | Medium |
| City of Hope Cancer Center | 110233 | 50 | Very Small |
| Fannin Regional Hospital | 110189 | 50 | Very Small |
| AdventHealth Murray | 110050 | 29 | Very Small |

## Sparse / zero-heavy component scores (kept)

Likely missing data encoded as `0` (grades left unchanged):

- **Fannin Regional Hospital** — Fiscal_Health, Endowment_Holdings, Staffing_Responsiveness, CB_Spending_Score, QCB_Spending_Score = 0; `Grade_Final` 1.25, `Stars` 1.5
- **Irwin County Hospital** — Fiscal_Health, Endowment_Holdings, CB_Spending_Score, QCB_Spending_Score = 0; `Grade_Final` 1.5, `Stars` 1.5
- **CB + QCB both 0:** Fannin Regional; South Georgia Medical Center Lanier Campus; Irwin County; Southern Regional Medical Center; South Georgia Medical Center; South Georgia Medical Center - Berrien Campus
- **Endowment_Holdings = 0:** 61 of 120 hospitals

## Brand / URL / naming quirks (kept)

- Piedmont McDuffie, Piedmont Augusta → `universityhealth.org` transparency URLs
- Fannin Regional → `blueridgemc.org` while independent (`systemName: null`)
- Navicent naming variants under Atrium Health (Peach; Medical Center; Rehabilitation; Baldwin)
- WellStar Sylvan Grove vs Wellstar elsewhere; system label `Wellstar`
- Hughes Spalding named CHOA but `systemName: Grady`

## Schema / UI notes

- `Grade_Final` retained for reference; UI display/sort uses `finalScore.Stars`
- Pillar headers in UI use `Grade_*` fields
- Component cells still read raw component scores (including zeros)
