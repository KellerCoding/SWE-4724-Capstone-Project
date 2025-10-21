import "./HospitalScore.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useParams } from "react-router-dom"
import EmoryHospital from "../assets/Images/hospitalLogos/emoryHealthcareLogo.png"
import HospitalData from "../data/testData.json"

export function HospitalScore(){
    const { hospitalId } = useParams()
    const hospitalInfo = HospitalData[hospitalId]?.hospitalInfo || {}

    const navigate = useNavigate()
    const MapViewClick = () => {
        navigate(`/georgia-map/${hospitalId}`);
    };
    
    
    const [expandedSections, setExpandedSections] = useState({
        financial: false,
        community: false,
        healthcare: false,
        accessibility: false,
        quality: false
    })

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }
    const [selected, setSelected] = useState(null);

    // In parent component
// const flyToHospital = (hospitalId) => {
//     console.log("HospitalInfo object", hospitalInfo)
//     console.log("Passed parameter:", hospitalId)
//     const hospital = hospitalInfo
//     console.log("Here is is:", hospital)
//     if (!hospital) return;
  
//     setSelected(hospital); // Optional: open popup
//     setViewState({
//       latitude: hospital.lat,
//       longitude: hospital.lng,
//       zoom: 12,
//     });
//   };
    
    return (
        <div className="hospital-score-page">
            
            <div className="banner">
                <h1><strong>{hospitalInfo.name || "Error Displaying Hospital Name"}</strong></h1>
            </div>
            
            {/* First Row - Individual Cards */}
            <div className="top-row">
                <div className="hospital-info-card">
                    <h3>Hospital Contact Information</h3>
                    <p><strong>Ph #:</strong> (404)712-2000</p>
                    <p><strong>Email:</strong> {hospitalInfo.email}</p>
                </div>
                
                <div className="emory-header">
                    <img className="hospitalLogo" src={EmoryHospital} alt="" />
                </div>
                
                <div className="overall-score-card">
                    <div className="score-header">Overall Score</div>
                    <div className="stars">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star">★</span>
                    </div>
                    <div className="grade">Grade: A</div>
                </div>
            </div>
            
            {/* Second Row - Main Content */}
            <div className="hospital-content">
                <div className="left-sidebar">
                    <div className="about-card">
                        <h3>About</h3>
                        <p><strong>County:</strong> {hospitalInfo.county}</p>
                        <p><strong>Beds available:</strong> 853</p>
                        <p><strong>Hospital System:</strong> Emory</p>
                        
                        <div className="services">
                            <p><strong>Services available:</strong></p>
                            <ul>
                                <li>Cardiology</li>
                                <li>Neuroscience</li>
                                <li>Cancer Care</li>
                                <li>Organ transplantation</li>
                                <li>Orthopedic surgery</li>
                            </ul>
                        </div>
                        
                        <div className="address">
                            <p><strong>Address:</strong></p>
                            <p>{hospitalInfo.address}<br/>{hospitalInfo.city}, GA, {hospitalInfo.zipcode}</p>
                        </div>
                        
                        <p className="more-info">More information will go here</p>
                        
                        <button onClick={MapViewClick} className="map-button">See on Map</button>
                        {/* <button
                            onClick={() => flyToHospital(hospitalId)}
                            className="map-button"
                            >
                            See on Map
                            </button> */}
                    </div>
                </div>
                
                <div className="right-content">
                    <div className="score-sections">
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('financial')}>
                                <h4>Financial Transparency and Institutional Health</h4>
                                <span className="toggle-arrow">{expandedSections.financial ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.financial && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <span>Financial Transparency Score</span>
                                        <span className="percentage">100%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '100%'}}></div>
                                    </div>
                                    <p className="description">Measures the availability and clarity of financial information.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('community')}>
                                <h4>Community Spending Benefits</h4>
                                <span className="toggle-arrow">{expandedSections.community ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.community && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <span>Community Spending Benefits Score</span>
                                        <span className="percentage">91%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '91%'}}></div>
                                    </div>
                                    <p className="description">Assesses how hospitals' investment in community health programs and services.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('healthcare')}>
                                <h4>Healthcare Affordability and Billing</h4>
                                <span className="toggle-arrow">{expandedSections.healthcare ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.healthcare && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <span>Healthcare Affordability Score</span>
                                        <span className="percentage">94%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '94%'}}></div>
                                    </div>
                                    <p className="description">Measures the hospital's commitment to affordable healthcare and fair billing.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('accessibility')}>
                                <h4>Healthcare Accessibility and Social Responsibility</h4>
                                <span className="toggle-arrow">{expandedSections.accessibility ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.accessibility && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <span>Healthcare Accessibility and Social Responsibility Score</span>
                                        <span className="percentage">80%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '80%'}}></div>
                                    </div>
                                    <p className="description">Reflects patient feedback on care quality and experience.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('quality')}>
                                <h4>Quality of Care</h4>
                                <span className="toggle-arrow">{expandedSections.quality ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.quality && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <span>Quality of Care Score</span>
                                        <span className="percentage">100%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '100%'}}></div>
                                    </div>
                                    <p className="description">Evaluates medical outcomes and adherence to best practices.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}