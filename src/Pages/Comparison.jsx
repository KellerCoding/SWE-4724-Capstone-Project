import "./Comparison.css";
import { useState } from "react";
import Tooltip from "../pages/Tooltip.jsx";
import HospitalDropdown from "../pages/Dropdown.jsx";
import testData from "../data/testData.json";

export function Comparison() {
  const hospitalList = Object.values(testData).map(
    (entry) => entry.hospitalInfo.name
  );

  const [selectedHospitals, setSelectedHospitals] = useState(["", "", "", ""]);

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

  return (
    <div className="comparison-page">
      <div className="banner">
        <h1><strong>Hospital Accountability Scores</strong></h1>
      </div>

      <div className="header">
        <h1><strong>Comparison of Hospital</strong></h1>
      </div>

      <div className="container">
        <div className="left">
          <div className="filter">
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

        <div className="right">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Metrics</th>
                {selectedHospitals.map((_, index) => (
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
                <td className="metricRow">Hospital Name</td>
                {selectedHospitals.map((name, i) => (
                  <td key={i} className="gradeRow">
                    {name || "-"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="metricRow">City</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.city || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className="metricRow">County</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.county || "-"}</td>;
                })}
              </tr>

              <tr>
                <td className="metricRow">Bed Size</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.bedSize || "-"}</td>;
                })}
              </tr>

            <tr>
              <td className="metricRow">Area Type</td>
              {selectedHospitals.map((name, i) => {
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
              <tr>
                <td className="gradeRow">Financial Transparency</td>
                {selectedHospitals.map((name, i) => {
                  const data = getHospitalData(name);
                  return <td key={i}>{data.financialTransparency || "-"}</td>;
                })}
              </tr>
              <tr>
                <td className="gradeRow">Community Benefit Spending</td>
                {selectedHospitals.map((name, i) => {
                    const data = getHospitalData(name);
                    return <td key={i}>{data.commBenefitSpending || "-"}</td>;
                })}
                </tr>
                <tr>
                <td className="gradeRow">Community Benefit Spending</td>
                {selectedHospitals.map((name, i) => {
                    const data = getHospitalData(name);
                    return <td key={i}>{data.healthcareAffordability || "-"}</td>;
                })}
                </tr>
                <tr>
                <td className="gradeRow">Healthcare Access</td>
                {selectedHospitals.map((name, i) => {
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


