import styles from "./Comparison.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../Pages/Tooltip.jsx";
import HospitalDropdown from "../Pages/Dropdown.jsx";
import testData from "../data/testData.json";
import finalData from "../data/finalData.json";
import star from "../assets/Images/ratingStar.png";
import dullStar from "../assets/Images/ratingStarGrey.png";

export function Comparison() {
  const dataSource = { ...testData, ...finalData };

  const hospitalList = Object.values(dataSource).map(
    (entry) => entry.hospitalInfo.name
  );

  const [selectedHospitals, setSelectedHospitals] = useState(["", "", "", ""]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHospitalSelect = (index, hospitalName) => {
    const newSelections = [...selectedHospitals];
    newSelections[index] = hospitalName;
    setSelectedHospitals(newSelections);
  };

  const getHospitalEntry = (hospitalName) => {
    const hospital = Object.values(dataSource).find(
      (entry) => entry.hospitalInfo.name === hospitalName
    );
    return hospital || null;
  };

  // helper: render stars (0-5). Non-numeric or out-of-range shows dashes
  const renderStars = (value) => {
    if (value === null || value === undefined || value === "NA" || value === "N/A") return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return "-";
    const filled = Math.max(0, Math.min(5, Math.round(num)));
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const src = i < filled ? star : dullStar;
      stars.push(<img key={i} src={src} alt={i < filled ? "star" : "dull"} className={styles.ratingStar} />);
    }
    return <div className={styles.starRow}>{stars}</div>;
  };

  // Special function for Charity_Care_Policies and Medical_Debt_Policies (divide by 4)
  const renderStarsDividedBy4 = (value) => {
    if (value === null || value === undefined || value === "NA" || value === "N/A") return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return "-";
    const dividedValue = num / 4;
    const filled = Math.max(0, Math.min(5, Math.round(dividedValue)));
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const src = i < filled ? star : dullStar;
      stars.push(<img key={i} src={src} alt={i < filled ? "star" : "dull"} className={styles.ratingStar} />);
    }
    return <div className={styles.starRow}>{stars}</div>;
  };

  // Helper to get field value with fallback for different naming conventions
  const getField = (obj, ...fieldNames) => {
    for (const fieldName of fieldNames) {
      if (obj?.[fieldName] !== undefined && obj?.[fieldName] !== null) {
        return obj[fieldName];
      }
    }
    return undefined;
  };

  // Show only 2 hospitals on mobile, 4 on desktop
  const displayedHospitals = isMobile ? selectedHospitals.slice(0, 2) : selectedHospitals;

  return (
    <div className={styles["comparison-page"]}>
      <div className={styles.banner}>
        <h1><strong>Hospital Accountability Scores</strong></h1>
        <hr/>
      </div>

      <div className={styles.navigationButtons}>
        <Link to="/scorecard">
          <button className={styles.backButton}>
            <h6>Back to Scorecard</h6>
          </button>
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.right}>
          <table className={styles["comparison-table"]}>
            <thead>
              <tr>
                <th>Metrics</th>
                {displayedHospitals.map((_, index) => (
                  <th key={index}>
                    <HospitalDropdown
                      hospitals={hospitalList}
                      onSelect={(name) => handleHospitalSelect(index, name)}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className={styles.metricRow}>Hospital Name</td>
                {displayedHospitals.map((name, i) => (
                  <td key={i} className={styles.gradeRow}>
                    {name || "-"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={styles.metricRow}>City</td>
                {displayedHospitals.map((name, i) => {
                  const entry = getHospitalEntry(name);
                  return <td key={i}>{entry?.hospitalInfo?.city || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className={styles.metricRow}>County</td>
                {displayedHospitals.map((name, i) => {
                  const entry = getHospitalEntry(name);
                  return <td key={i}>{entry?.hospitalInfo?.county || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className={styles.metricRow}>Bed Size</td>
                {displayedHospitals.map((name, i) => {
                  const entry = getHospitalEntry(name);
                  return <td key={i}>{entry?.hospitalInfo?.bedSize || "-"}</td>;
                })}
              </tr>

            <tr>
              <td className={styles.metricRow}>Area Type</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                const data = entry?.hospitalInfo || {};
                let areaLabel = "-";

                if (data.areaType === "1" || data.areaType === 1) {
                  areaLabel = "Rural";
                } else if (data.areaType === "0" || data.areaType === 0) {
                  areaLabel = "Urban";
                }

                return <td key={i}>{areaLabel}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Financial Transparency - Transparency</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.financialTransparency?.Transparency)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Financial Transparency - Fiscal Health</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                const value = getField(entry?.financialTransparency, "Fiscal_Health", "fiscalHealth");
                return <td key={i}>{renderStars(value)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Financial Transparency - Endowment Holdings</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                const value = getField(entry?.financialTransparency, "Endowment_Holdings", "endowmentHoldings");
                return <td key={i}>{renderStars(value)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Financial Transparency - Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                const value = getField(entry?.financialTransparency, "Grade_Financial_Transparency", "gradeFinancialTransparency");
                return <td key={i}>{renderStars(value)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Community Benefit - CB Spending Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.commBenefitSpending?.CB_Spending_Score)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Community Benefit - QCB Spending Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.commBenefitSpending?.QCB_Spending_Score)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Community Benefit - Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.commBenefitSpending?.Grade_Comm_Benefit_Spending)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Affordability - Financial Burden</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAffordability?.Financial_Burden)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Affordability - Charity Care Policies</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStarsDividedBy4(entry?.healthcareAffordability?.Charity_Care_Policies)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Affordability - Medical Debt Policies</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStarsDividedBy4(entry?.healthcareAffordability?.Medical_Debt_Policies)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Affordability - Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAffordability?.Grade_Healthcare_Affordability)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Access - Demographic Alignment</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAccess?.Demographic_Alignment)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Access - MIUR Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAccess?.MIUR_score)}</td>;
              })}
            </tr>



            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Access - Pay Equity</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAccess?.Pay_Equity)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Healthcare Access - Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                return <td key={i}>{renderStars(entry?.healthcareAccess?.Grade_Healthcare_Access)}</td>;
              })}
            </tr>

            <tr className={styles.gradeRow}>
              <td className={styles.metricRow}>Final Score</td>
              {displayedHospitals.map((name, i) => {
                const entry = getHospitalEntry(name);
                const value = getField(entry?.finalScore, "Grade_Final") || entry?.healthcareAccess?.Grade_Final;
                return <td key={i}>{renderStars(value)}</td>;
              })}
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}