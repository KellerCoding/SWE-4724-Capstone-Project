import "./SubNavbar.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SubNavbar(){
    const [showGetAssistanceDropdown, setShowGetAssistanceDropdown] = useState(false)
    const [showOurFocusDropdown, setShowOurFocusDropdown] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    
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
                        <img style={{width:"10rem"}} src="src/assets/Images/gwatchlogo.png" alt="Georgia Watch Logo" />
                    </div>
                </div>
            </div>
            
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? '✕' : '☰'}
            </button>
            
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                {/* <li className="nav-item">
                    <a style={{color:"#333"}} href="" className="nav-link">
                        OUR FOCUS
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li> */}
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
                    <a style={{color:"#333"}} href="" className="nav-link">
                        ADVOCACY
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a style={{color:"#333"}} href="" className="nav-link">
                        SUPPORT US
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
            </ul>
            
            <div className="donate-container">
                <button className="donate-btn" onClick={handleDonateClick}>DONATE</button>
            </div>
        </nav>
                )
    
}
