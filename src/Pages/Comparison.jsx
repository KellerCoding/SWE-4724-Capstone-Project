import './Comparison.css'
import { useState } from "react"
import Tooltip from "../pages/Tooltip.jsx"
import HospitalDropdown from "../pages/dropdown.jsx"

export function Comparison() {
    const georgiaHospitals = [
        "Emory University Hospital",
        "Grady Memorial Hospital",
        "Piedmont Atlanta Hospital",
        "Northside Hospital",
        "Augusta University Medical Center",
        "WellStar Kennestone Hospital",
        "Navicent Health Medical Center",
      ];

      const handleHospitalSelect = (hospital) => {
        console.log("Selected hospital:", hospital);
      };

    return (
        <div className="comparison-page">
            <div className="banner">
                <h1><strong>Comparison Page</strong></h1>
            </div>

            <div className="container">
                <div className="left">
                    <div className="filter">
                        <h5>Filter By</h5>
                        <button>
                            <h6>City</h6>
                        </button>
                        <button>
                            <h6>County</h6>
                        </button>
                        <button>
                            <h6>Beds Available</h6>
                        </button>
                            <Tooltip
                              position="top"
                              background="#6fb353"
                              content="Gotta build logic for filtering."
                            >
                              <button
                                style={{
                                  backgroundColor: "#042069",
                                  color: "white"
                                }}
                              >
                                <h6 style={{ margin: 0 }}>Trauma Level</h6>
                              </button>
                            </Tooltip>
                    </div>
                </div>
                <div className="right">
                    <div className="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className="dropdown-section">
                                            <HospitalDropdown hospitals={georgiaHospitals} onSelect={handleHospitalSelect} />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="dropdown-section">
                                            <HospitalDropdown hospitals={georgiaHospitals} onSelect={handleHospitalSelect} />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="dropdown-section">
                                            <HospitalDropdown hospitals={georgiaHospitals} onSelect={handleHospitalSelect} />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="dropdown-section">
                                            <HospitalDropdown hospitals={georgiaHospitals} onSelect={handleHospitalSelect} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
