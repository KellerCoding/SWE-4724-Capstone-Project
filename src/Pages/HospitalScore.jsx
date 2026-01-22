import "./HospitalScore.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useState } from "react"
import { useParams } from "react-router-dom"
import ReactComponent from "react"
// import HospitalData from "../data/testData.json"
import HospitalData from "../data/finalData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"
import MapIcon from "../assets/Images/clearmapicon.webp"
import BedIcon from "../assets/Images/bedicon.png"
import HospitalIcon from "../assets/Images/HospitalIcon.png"

export function HospitalScore() {
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

            {/* Navigation Button */}
            <div className="navigation-buttons">
                <Link to="/scorecard">
                    <button className="back-button">
                        <h6>Back to Scorecard</h6>
                    </button>
                </Link>
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
                        {hospitalData.finalScore?.Grade_Final===0 && <h3>There is insufficient data from this facility. Scores will be updated when it is available</h3>}
                        <div className="address">
                            <p><strong>Address:</strong></p>
                            <p>{hospitalInfo.address}<br />{hospitalInfo.city}, GA, {hospitalInfo.zipcode}</p>
                        </div>

                        <p> <strong>{hospitalInfo.county} County</strong> </p>
                        <p><strong><img className="mapicon" src={MapIcon} alt="Area Type" height={25} width={25}  /> </strong> {hospitalInfo.areaType === 1 ? "Rural" : "Urban"} </p>

                        {hospitalInfo.bedSize && <p><strong><img className="mapicon" src={BedIcon} alt="Area Type" height={28} width={28}  /> </strong> {hospitalInfo.bedSize} Total Beds</p>}
                        {hospitalInfo.hospitalSystem===1 && <p><strong><img className="mapicon" src={HospitalIcon} alt="Area Type" height={24} width={28}  />    </strong> {hospitalInfo.systemName}</p>}
                        <br/>
                        <p><strong>{hospitalInfo.criticalAccess===1 ? "Critical Access Hospital" : "Non-Critical Access Hospital" }</strong></p>

                        <br/>
                        <p><strong><a href={hospitalInfo.website} target="_blank">View Hospital Transparency Info</a></strong></p>
                        <br/>
                        {/* <div className="services">
                            <p><strong>Services available:</strong></p>
                            <ul>
                                <li>Cardiology</li>
                                <li>Neuroscience</li>
                                <li>Cancer Care</li>
                                <li>Organ transplantation</li>
                                <li>Orthopedic surgery</li>
                            </ul>
                        </div> */}



                        {/*<p className="more-info">More information will go here</p>*/}

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
                                <div className="section-header-content">
                                    <h4>Financial Transparency and Fiscal Health</h4>
                                    <div className="header-score">{renderStars(hospitalData.financialTransparency?.Grade_Financial_Transparency)}</div>
                                </div>
                                <span className="toggle-arrow">{expandedSections.financial ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.financial && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Transparency</span>
                                            <span className="metric-description">Measures the level of compliance in publishing the 14 required organizational documents</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Transparency)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Fiscal Health</span>
                                            <span className="metric-description">Measures profitability, liquidity, debt capacity & solvency, and capital investment</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.financialTransparency?.Fiscal_Health)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Endowment Holdings</span>
                                            <span className="metric-description">Measures the rate of endowment holdings compared to expenses</span>
                                        </div>
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
                                <div className="section-header-content">
                                    <h4>Community Benefit Spending</h4>
                                    <div className="header-score">{renderStars(hospitalData.commBenefitSpending?.Grade_Comm_Benefit_Spending)}</div>
                                </div>
                                <span className="toggle-arrow">{expandedSections.community ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.community && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Community Benefit Spending</span>
                                            <span className="metric-description">Measures the rate of community benefit spending as a percentage of expenditures</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.commBenefitSpending?.CB_Spending_Score)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Quality Community Benefit Spending</span>
                                            <span className="metric-description">Measures the rate of community benefit spending that has a direct impact on the community and is equal to community benefit spending without Medicaid Shortfall, Research, and Physician training</span>
                                        </div>
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
                                <div className="section-header-content">
                                    <h4>Healthcare Affordability and Billing Practices</h4>
                                    <div className="header-score">{renderStars(hospitalData.healthcareAffordability?.Grade_Healthcare_Affordability)}</div>
                                </div>
                                <span className="toggle-arrow">{expandedSections.healthcare ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.healthcare && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Financial Burden on Patients</span>
                                            <span className="metric-description">Measures the difference between the costs of providing a service and the amount a hospital charges</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAffordability?.Financial_Burden)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Charity Care Policies</span>
                                            <span className="metric-description">Measures the generosity of charity care policies based on eligibility criteria, the effectiveness of screening, and other implementation strategies</span>
                                        </div>
                                        <div className="star-display">{renderStarsDividedBy4(hospitalData.healthcareAffordability?.Charity_Care_Policies)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Medical Debt Policies</span>
                                            <span className="metric-description">Measures the quality of debt collection practices</span>
                                        </div>
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
                                <div className="section-header-content">
                                    <h4>Healthcare Accessibility and Social Responsibility</h4>
                                    <div className="header-score">{renderStars(hospitalData.healthcareAccess?.Grade_Healthcare_Access)}</div>
                                </div>
                                <span className="toggle-arrow">{expandedSections.accessibility ? '▲' : '▼'}</span>
                            </div>
                            {expandedSections.accessibility && (
                                <div className="section-content">
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Demographic Alignment</span>
                                            <span className="metric-description">Measures how well the demographic makeup of patients matches the demographic makeup of the surrounding community</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.Demographic_Alignment)}</div>
                                    </div>
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Patient Payer Mix (MIUR Score)</span>
                                            <span className="metric-description">Measures the portion of patients who are on Medicaid or are otherwise low-income</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.MIUR_score)}</div>
                                    </div>
                                    {/* <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Patient Payer Mix (LIUR Score)</span>
                                            <span className="metric-description">Measures the portion of patients who are on Medicaid or are otherwise low-income</span>
                                        </div>
                                        <div className="star-display">{renderStars(hospitalData.healthcareAccess?.LIUR_score)}</div>
                                    </div> */}
                                    <div className="score-item">
                                        <div className="score-label-container">
                                            <span>Pay Equity</span>
                                            <span className="metric-description">Measures the ratio of CEO compensation to the average direct patient services salary</span>
                                        </div>
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