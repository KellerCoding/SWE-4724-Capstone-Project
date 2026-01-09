import "./HospitalScore.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useParams } from "react-router-dom"
// import HospitalData from "../data/testData.json"
import HospitalData from "../data/finalData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"

export function HospitalScore(){
    const { hospitalId } = useParams()
    const hospitalData = HospitalData[hospitalId] || {}
    const hospitalInfo = hospitalData.hospitalInfo || {}

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

    // Helper function to render stars (0-5). Non-numeric or out-of-range shows dashes
    const renderStars = (value) => {
        if (value === null || value === undefined || value === "NA" || value === "N/A") return "-";
        const num = Number(value);
        if (Number.isNaN(num)) return "-";
        const filled = Math.max(0, Math.min(5, Math.round(num)));
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const src = i < filled ? star : dullStar;
            stars.push(<img key={i} src={src} alt={i < filled ? "star" : "dull"} className="rating-star" />);
        }
        return <div className="star-row">{stars}</div>;
    };

    // Special function for Charity_Care_Policies and Medical_Debt_Policies (divide by 4)
    const renderStarsDividedBy4 = (value) => {
        if (value === null || value === undefined || value === "NA" || value === "N/A") return "-";
        const num = Number(value);
        if (Number.isNaN(num)) return "-";
        const dividedValue = num / 4;
        const filled = Math.max(0, Math.min(5, Math.round(dividedValue)));
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const src = i < filled ? star : dullStar;
            stars.push(<img key={i} src={src} alt={i < filled ? "star" : "dull"} className="rating-star" />);
        }
        return <div className="star-row">{stars}</div>;
    };

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
                <h1><strong>Georgia Hospital Accountability Scorecard</strong></h1>
            </div>
            
            {/* First Row - Hospital Name and Final Score */}
            <div className="top-row">
                <div className="hospital-header">
                    <h2 className="hospital-name">{hospitalInfo.name || "Hospital Name"}</h2>
                    <div className="final-score-display">
                        <span className="score-label">Final Score:</span>
                        <div className="stars">
                            {(() => {
                                const grade = hospitalData.finalScore?.Grade_Final ?? 0;
                                const stars = [];
                                for (let i = 0; i < 5; i++) {
                                    stars.push(
                                        <img 
                                            key={i} 
                                            src={i < grade ? star : dullStar} 
                                            alt={i < grade ? "star" : "dull"} 
                                            className="rating-star-header"
                                        />
                                    );
                                }
                                return stars;
                            })()}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Second Row - Main Content */}
            <div className="hospital-content">
                <div className="left-sidebar">
                    <div className="about-card">
                        <h3>About</h3>
                        <p><strong>County:</strong> {hospitalInfo.county}</p>
                        <p><strong>Beds available:</strong> {hospitalInfo.bedSize}</p>
                        <p><strong>Hospital System:</strong> {hospitalInfo.hospitalSystem}</p>
                        
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
                        
                        <p className="more-info">Pending Hospital Description</p>
                        
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
                                    <p className="description">Measures the level of compliance in publishing the 14 required organizational documents.</p>

                                    <div className="score-item">
                                        <span>Transparency</span>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Transparency)}</div>
                                        <br/>

                                    </div>
                                    <p className="description">Measures profitability, liquidity, debt capacity & solvency, and capital expenses.</p>

                                    <div className="score-item">
                                        <span>Fiscal Health</span>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Fiscal_Health)}</div>
                                    </div>
                                    <p className="description">Measures the rate of endowment holdings compared to expenses.</p>

                                    <div className="score-item">
                                        <span>Endowment Holdings</span>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Endowment_Holdings)}</div>
                                    </div>
                                    <div className="score-item final-score-item">
                                        <span>Score - Financial Transparency</span>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Grade_Financial_Transparency)}</div>
                                    </div>
                                    <p className="description">Measures the availability and clarity of financial information.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('community')}>
                                <h4>Community Benefits Spending</h4>
                                <span className="toggle-arrow">{expandedSections.community ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.community && (
                                <div className="section-content">
                                    <p className="description">Measures the rate of community benefit spending as a percentage of expenditures.</p>

                                    <div className="score-item">
                                        <span>CB Spending Score</span>
                                        <div className="star-display">{renderStars(hospitalData.commBenefitSpending?.CB_Spending_Score)}</div>
                                    </div>
                                    <p className="description">Measures the rate of community benefit spending that has a direct impact on the community and is equal to community benefit spending without Medicaid Shortfall, Research, and Physician training.</p>

                                    <div className="score-item">
                                        <span>Quality Community Benefit Spending Score</span>
                                        <div className="star-display">{renderStars(hospitalData.commBenefitSpending?.QCB_Spending_Score)}</div>
                                    </div>
                                    <div className="score-item final-score-item">
                                        <span>Score - Community Benefit Spending</span>
                                        <div className="star-display">{renderStars(hospitalData.commBenefitSpending?.Grade_Comm_Benefit_Spending)}</div>
                                    </div>
                                    <p className="description">Assesses how hospitals' investment in community health programs and services.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('healthcare')}>
                                <h4>Healthcare Affordability and Billing Practices</h4>
                                <span className="toggle-arrow">{expandedSections.healthcare ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.healthcare && (
                                <div className="section-content">
                                    <p className="description">Measures the difference between the costs of providing a service and the amount a hospital charges.</p>

                                    <div className="score-item">
                                        <span>Financial Burden on Patients</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAffordability?.Financial_Burden)}</div>
                                    </div>
                                    <p className="description">Measures the generosity of charity care policies based on eligibility criteria, the effectiveness of screening, and other implementation strategies.</p>

                                    <div className="score-item">
                                        <span>Charity Care Policies</span>
                                        <div className="star-display">{renderStarsDividedBy4(hospitalData.healthcareAffordability?.Charity_Care_Policies)}</div>
                                    </div>
                                    <p className="description">Measures the quality of debt collection practices.</p>

                                    <div className="score-item">
                                        <span>Medical Debt Policies</span>
                                        <div className="star-display">{renderStarsDividedBy4(hospitalData.healthcareAffordability?.Medical_Debt_Policies)}</div>
                                    </div>
                                    <div className="score-item final-score-item">
                                        <span>Score - Healthcare Affordability</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAffordability?.Grade_Healthcare_Affordability)}</div>
                                    </div>
                                    <p className="description">Measures the hospital's commitment to affordable healthcare and fair billing.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('accessibility')}>
                                <h4>Healthcare Access and Social Responsibility</h4>
                                <span className="toggle-arrow">{expandedSections.accessibility ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.accessibility && (
                                <div className="section-content">
                                    <p className="description">Measures how well the demographic makeup of patients matches the demographic makeup of the surrounding community.</p>

                                    <div className="score-item">
                                        <span>Demographic Alignment</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.Demographic_Alignment)}</div>
                                    </div>
                                    <div className="score-item">
                                        <span>MIUR Score</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.MIUR_score)}</div>
                                    </div>
                                    <div className="score-item">
                                        <span>LIUR Score</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.LIUR_score)}</div>
                                    </div>
                                    <p className="description">Measures the ratio of CEO compensation to the average direct patient services salary.</p>

                                    <div className="score-item">
                                        <span>Pay Equity</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.Pay_Equity)}</div>
                                    </div>
                                    <div className="score-item final-score-item">
                                        <span>Score - Healthcare Access</span>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.Grade_Healthcare_Access)}</div>
                                    </div>

                                    <p className="description">Reflects care quality and experience.</p>
                                </div>
                            )}
                        </div>
                        {/* <div className="score-section">
                            <div className="section-header" onClick={() => toggleSection('quality')}>
                                <h4>Quality of Care</h4>
                                <span className="toggle-arrow">{expandedSections.quality ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.quality && (
                                <div className="section-content">
                                    <p className="description">Quality of care metrics will be displayed here when available.</p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}