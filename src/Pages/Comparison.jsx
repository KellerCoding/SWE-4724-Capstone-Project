import React, { useState } from "react";
import HospitalDropdown from "../Components/HospitalDropdown";
import hospitalData from "../Data/hospitalData.json";

const Comparison = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleSelect = (hospitalName) => {
    const data = hospitalData[hospitalName];
    setSelectedHospital({ name: hospitalName, ...data });
  };

  const hospitalNames = Object.keys(hospitalData);

  return (
    <div className="comparison-container">
      <h1>Hospital Comparison</h1>

      <HospitalDropdown hospitals={hospitalNames} onSelect={handleSelect} />

      {selectedHospital ? (
        <div className="table-container">
          <h2>{selectedHospital.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedHospital.hospitalInfo).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please select a hospital to view its details.</p>
      )}
    </div>
  );
};

export default Comparison;
