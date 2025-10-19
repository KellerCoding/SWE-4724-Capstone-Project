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
                <h1><strong>Hospital Accountability Scores</strong></h1>
            </div>
            <div className="header">
                <h1><strong>Comparison Hospitals</strong></h1>
            </div>
            <div className="container">
                <div className="left">
                    <div className="filter">
                        <h5>Sort By</h5>
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
                                  backgroundColor: "#6fb353",
                                }}
                              >
                                <h6 style={{ margin: 0 }}>Trauma Level</h6>
                              </button>
                            </Tooltip>
                    </div>
                </div>
                <div className="right">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="th1">
                                            Metrics
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
                                    <th>
                                        <div className="dropdown-section">
                                            <HospitalDropdown hospitals={georgiaHospitals} onSelect={handleHospitalSelect} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td  className={"metricRow"}>Overall Rating</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Bed Availability</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Balanced Growth</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>A</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Transparency</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Fiscal Health</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Staffing</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Tax Benefits</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Quality of CBS</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Strategic Use</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Financial Burden</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Charity Care</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Medical Debt</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Range of Services</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                                <tr>
                                <td  className={"metricRow"}>Pay Equity Ratio</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                <td className={"gradeRow"}>A</td>
                                <td className={"gradeRow"}>B</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
}
