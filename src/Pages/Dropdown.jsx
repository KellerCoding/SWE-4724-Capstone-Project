import React, { useState } from "react";
import "./Dropdown.css";

const HospitalDropdown = ({ hospitals, onSelect, label = "Select a Hospital:" }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (event) => {
    const chosenHospital = event.target.value;
    setSelected(chosenHospital);
    if (onSelect) onSelect(chosenHospital);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="hospital-dropdown" className="dropdown-label">
        {label}
      </label>
      <select
        id="hospital-dropdown"
        value={selected}
        onChange={handleSelect}
        className="hospital-dropdown"
      >
        <option value="">-- Choose a hospital --</option>
        {hospitals.map((hospital, index) => (
          <option key={index} value={hospital}>
            {hospital}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HospitalDropdown;
