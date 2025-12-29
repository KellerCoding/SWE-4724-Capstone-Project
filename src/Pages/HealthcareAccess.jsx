import "./HealthcareAccess.css"
import { Link } from "react-router-dom"

export function HealthcareAccess() {
    return (
        <div className="healthcare-access-page">
            {/* Green Banner Section */}
            <div className="healthcare-banner">
                <div className="banner-content">
                    <div className="banner-text">
                        <h1 className="banner-title">Healthcare Access</h1>
                        <p className="banner-description">
                            Getting affordable healthcare is a challenge for many Georgians—especially those without insurance, 
                            living in rural areas, earning low incomes, or facing language barriers. But we believe in a Georgia 
                            where all consumers can access safe, quality care. Georgia Watch works to make healthcare more accessible 
                            by educating the public, uplifting community voices, and advocating for policies that put people—not profits—first.
                        </p>
                    </div>
                    <div className="banner-icon">
                        <div className="magnifying-glass">
                            <div className="magnifying-glass-content">
                                <div className="stethoscope-icon">🩺</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="main-content">
                <div className="content-wrapper">
                    <div className="content-left">
                        <div className="hospital-image-container">
                            <div className="hospital-image-placeholder">
                                <div className="hospital-sign">
                                    <div className="emergency-sign">EMERGENCY</div>
                                    <div className="h-sign">H</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="content-right">
                        <h2 className="priorities-heading">Healthcare Priorities</h2>
                        <h3 className="accountability-heading">Hospital Accountability</h3>
                        <p className="content-text">
                            Hospital closures across Georgia are leaving communities without essential care, straining nearby 
                            healthcare systems, and deepening disparities in access. The Georgia Watch Hospital Accountability 
                            Framework offers policy solutions to prevent these closures and ensure hospitals remain where they're 
                            most needed. While nonprofit hospitals are meant to serve vulnerable populations, many prioritize 
                            revenue over patient needs, despite receiving tax exemptions that require them to reinvest in 
                            community care. With limited federal oversight to enforce these standards, Georgia Watch pushes 
                            for greater financial transparency, stronger medical debt protections, and expanded financial assistance 
                            to improve healthcare affordability statewide.
                        </p>
                        
                        <ul className="priority-list">
                            <li className="priority-item">
                                <span className="plus-icon">+</span>
                                Community Health Workers
                            </li>
                            <li className="priority-item">
                                <span className="plus-icon">+</span>
                                Medical Debt
                            </li>
                            <li className="priority-item">
                                <span className="plus-icon">+</span>
                                Health Insurance Marketplace Affordability
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Resources Section */}
            <div className="resources-section">
                <h2 className="resources-heading">Georgia Watch Resources</h2>
                <div className="resources-grid">
                    {/* Left Resource Document */}
                    <div className="resource-document">
                        <div className="document-image-section prenatal-image">
                            <div className="prenatal-photo">
                                <div className="prenatal-icon">🤰</div>
                            </div>
                        </div>
                        <div className="document-content-section">
                            <h3 className="document-title">ACCESSING PRENATAL CARE IN GEORGIA: A Host of Challenges and Proven Solutions</h3>
                            <div className="document-meta">
                                <p className="document-date">FEBRUARY 2025</p>
                                <p className="document-org">Georgia Watch</p>
                            </div>
                            <div className="document-logo-bottom">
                                <div className="document-magnifying-glass">
                                    <div className="document-logo-text">GEORGIA WATCH</div>
                                </div>
                                <div className="document-ribbon">
                                    <span>PROTECTING CONSUMERS</span>
                                    <span>SINCE 2002</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Resource Document */}
                    <div className="resource-document">
                        <div className="document-header-section">
                            <div className="document-header-content">
                                <div className="document-header-logo">
                                    <div className="document-magnifying-glass-small">
                                        <div className="document-logo-text-small">GEORGIA WATCH</div>
                                    </div>
                                    <p className="document-tagline">PROTECTING CONSUMERS. PROMOTING TRANSPARENCY. EMPOWERING CITIZENS.</p>
                                </div>
                            </div>
                        </div>
                        <div className="document-content-section guide-content">
                            <h3 className="document-title guide-title">GEORGIA CONSUMER GUIDE FOR MEDICAL BILLS AND DEBT</h3>
                            <div className="guide-icon-section">
                                <div className="piggy-bank-container">
                                    <div className="piggy-bank-icon">🐷</div>
                                </div>
                            </div>
                            <div className="document-authors">
                                <p className="author-names">Berneta L. Haynes, JD, Director of Equity and Access</p>
                                <p className="author-names">Beth Stephens, JD, Senior Director of Public Policy and Advocacy</p>
                                <p className="document-date">February 2017 - Last updated Feb. 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Scorecard Resource Document */}
                    <Link to="/scorecard" className="resource-document-link">
                        <div className="resource-document scorecard-document">
                            <div className="document-image-section scorecard-image">
                                <div className="scorecard-photo">
                                    <div className="scorecard-icon">🏥</div>
                                </div>
                            </div>
                            <div className="document-content-section">
                                <h3 className="document-title">HOSPITAL ACCOUNTABILITY SCORECARD</h3>
                                <div className="document-meta">
                                    <p className="document-date">GEORGIA HOSPITAL INDEX</p>
                                    <p className="document-org">Georgia Watch</p>
                                </div>
                                <div className="document-description">
                                    <p>Explore hospital accountability scores, compare facilities, and access transparency data for Georgia hospitals.</p>
                                </div>
                                <div className="document-logo-bottom">
                                    <div className="document-magnifying-glass">
                                        <div className="document-logo-text">GEORGIA WATCH</div>
                                    </div>
                                    <div className="document-ribbon">
                                        <span>PROTECTING CONSUMERS</span>
                                        <span>SINCE 2002</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

