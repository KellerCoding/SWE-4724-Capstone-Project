import './Comparison.css'
import { useState } from "react"
import Tooltip from "../pages/Tooltip.jsx"

export function Comparison() {
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
                    <div className="hospital-cards">
                        {/* Example hospital card */}
                        <div className="hospital-card">
                            <h3>Hospital Name</h3>
                            <p>Location: City, State</p>
                            <p>Beds Available: 150</p>
                            <p>Trauma Level: Level 1</p>
                            <p>Rating: ★★★★☆</p>
                        </div>
                        {/* Add more hospital cards as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}