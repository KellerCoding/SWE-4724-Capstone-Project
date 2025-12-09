import styles from "./Comparison.module.css";
import { useState, useEffect } from "react";
import Tooltip from "../Pages/Tooltip.jsx";
import HospitalDropdown from "../Pages/Dropdown.jsx";
import testData from "../data/testData.json";

export function Comparison() {
  const hospitalList = Object.values(testData).map(
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

  const getHospitalData = (hospitalName) => {
    const hospital = Object.values(testData).find(
      (entry) => entry.hospitalInfo.name === hospitalName
    );
    return hospital ? hospital.hospitalInfo : {};
  };

  // Show only 2 hospitals on mobile, 4 on desktop
  const displayedHospitals = isMobile ? selectedHospitals.slice(0, 2) : selectedHospitals;

  return (
    <div className={styles["comparison-page"]}>
      <div className={styles.banner}>
        <h1><strong>Hospital Accountability Scores</strong></h1>
      </div>

      <div className={styles.header}>
        <h1><strong>Comparison of Hospital</strong></h1>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.filter}>
            <Tooltip
              position="top"
              background="#6fb353"
              content="Just wanna show how the system will work."
            >
              <button style={{ backgroundColor: "#6fb353" }}>
                <h6 style={{ margin: 0 }}>Temporary button</h6>
              </button>
            </Tooltip>
          </div>
        </div>

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
                  const data = getHospitalData(name);
                  return <td key={i}>{data.city || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className={styles.metricRow}>County</td>
                {displayedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.county || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className={styles.metricRow}>Bed Size</td>
                {displayedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.bedSize || "-"}</td>;
                })}
              </tr>

            <tr>
              <td className={styles.metricRow}>Area Type</td>
              {displayedHospitals.map((name, i) => {
                const data = getHospitalData(name);
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
                <td className={styles.metricRow}>Financial Transparency</td>
                {displayedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.financialTransparency || "-"}</td>;
                })}
              </tr>
              <tr className={styles.gradeRow}>
                <td className={styles.metricRow}>Community Benefit Spending</td>
                {displayedHospitals.map((name, i) => {
                    const data = getHospitalData(name);
                    return <td key={i}>{data.commBenefitSpending || "-"}</td>;
                })}
                </tr>
                <tr className={styles.gradeRow}>
                <td className={styles.metricRow}>Healthcare Affordability</td>
                {displayedHospitals.map((name, i) => {
                    const data = getHospitalData(name);
                    return <td key={i}>{data.healthcareAffordability || "-"}</td>;
                })}
                </tr>
                <tr className={styles.gradeRow}>
                <td className={styles.metricRow}>Healthcare Access</td>
                {displayedHospitals.map((name, i) => {
                    const data = getHospitalData(name);
                    return <td key={i}>{data.healthcareAccess || "-"}</td>;
                })}
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
