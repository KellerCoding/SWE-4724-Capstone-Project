import "./SubNavbar.css"
import gwatchLogo from "../assets/Images/gwatchlogo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export function SubNavbar() {
    // Main site nav with logo, dropdowns, donate
    const [showGetAssistanceDropdown, setShowGetAssistanceDropdown] = useState(false)
    const [showOurFocusDropdown, setShowOurFocusDropdown] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    const redirectToGAWatch = () => {
        window.location.href = 'https://www.georgiawatch.org/';
    };

    const handleDonateClick = () => {
        navigate('/scorecard')
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <nav className="subnavbar">
            <div className="logo-container">
                <div className="logo">
                    <div>
                        <button onClick={redirectToGAWatch} type="button">
                            <img style={{width:"10rem"}} src={gwatchLogo} alt="Georgia Watch Logo" />
                        </button>
                    </div>
                </div>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} type="button">
                {mobileMenuOpen ? '✕' : '☰'}
            </button>

            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <li className="nav-item dropdown-container"
                    onMouseEnter={() => setShowOurFocusDropdown(true)}
                    onMouseLeave={() => setShowOurFocusDropdown(false)}>
                    <Link
                        style={{color:"#333"}}
                        to="/healthcare-access"
                        className="nav-link"
                        onClick={(e) => {
                            if (window.innerWidth <= 768) {
                                e.preventDefault();
                                setShowOurFocusDropdown(!showOurFocusDropdown);
                            }
                        }}>
                        OUR FOCUS
                        <span className="dropdown-arrow">▼</span>
                    </Link>
                    {showOurFocusDropdown && (
                        <div className="dropdown-menu">
                            <Link to="/healthcare-access" className="dropdown-item highlighted" onClick={() => setMobileMenuOpen(false)}>HEALTHCARE ACCESS</Link>
                            <Link to="/access-to-civil-justice" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>ACCESS TO CIVIL JUSTICE</Link>
                            <Link to="/consumer-energy" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>CONSUMER ENERGY</Link>
                            <Link to="/financial-protection" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>FINANCIAL PROTECTION</Link>
                        </div>
                    )}
                </li>
                <li className="nav-item dropdown-container"
                    onMouseEnter={() => setShowGetAssistanceDropdown(true)}
                    onMouseLeave={() => setShowGetAssistanceDropdown(false)}>
                    <Link
                        style={{color:"#333"}}
                        to="/resource-directory"
                        className="nav-link"
                        onClick={(e) => {
                            if (window.innerWidth <= 768) {
                                e.preventDefault();
                                setShowGetAssistanceDropdown(!showGetAssistanceDropdown);
                            }
                        }}>
                        GET ASSISTANCE
                        <span className="dropdown-arrow">▼</span>
                    </Link>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <Link to="/educational-workshop" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>EDUCATIONAL WORKSHOP</Link>
                            <Link to="/dispute-resolution" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>DISPUTE RESOLUTION TIPS</Link>
                            <Link to="/resource-directory" className="dropdown-item highlighted" onClick={() => setMobileMenuOpen(false)}>RESOURCE DIRECTORY</Link>
                        </div>
                    )}
                </li>
                <li className="nav-item">
                    <Link style={{color:"#333"}} to="/scorecard" className="nav-link">
                        ADVOCACY
                        <span className="dropdown-arrow">▼</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a style={{color:"#333"}} href="https://georgiawatch.org/support-us/" className="nav-link">
                        SUPPORT US
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
            </ul>

            <div className="donate-container">
                <button className="donate-btn" onClick={handleDonateClick} type="button">DONATE</button>
            </div>
        </nav>
    )
}
