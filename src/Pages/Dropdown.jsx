import React, { useState } from "react";
import testData from "../data/testData.json";

const HospitalDropdown = () => {
  const [selected, setSelected] = useState("");

  // Extract hospital names from the JSON
  const hospitals = Object.values(testData).map(
    (entry) => entry.hospitalInfo.name
  );

  return (
    <div>
      <label htmlFor="hospital-dropdown">Select a Hospital:</label>
      <select
        id="hospital-dropdown"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- Choose a hospital --</option>
        {hospitals.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>

      {selected && <p>You selected: {selected}</p>}
    </div>
  );
};

export default HospitalDropdown;

