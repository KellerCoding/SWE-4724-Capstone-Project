import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const HospitalDropdown = ({ hospitals, onSelect, label = "Select a Hospital:" }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (event) => {
    const chosenHospital = event.target.value;
    setSelected(chosenHospital);
    if (onSelect) onSelect(chosenHospital);
  };

  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor="hospital-dropdown" className={styles["dropdown-label"]}>
        {label}
      </label>
      <select
        id="hospital-dropdown"
        value={selected}
        onChange={handleSelect}
        className={styles["hospital-dropdown"]}
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
