import "./SubNavbar.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SubNavbar(){
    const [showGetAssistanceDropdown, setShowGetAssistanceDropdown] = useState(false)
    const navigate = useNavigate()
    
    const handleDonateClick = () => {
        navigate('/scorecard')
    }
    return (
        <nav className="subnavbar">
            <div className="logo-container">
                <div className="logo">
                    <div>
                        <img style={{width:"10rem"}} src="src/assets/Images/gwatchlogo.png" alt="" />
                    </div>
                </div>
            </div>
            
            <ul className="nav-menu">
                <li className="nav-item">
                    <a style={{color:"#333"}} href="" className="nav-link">
                        OUR FOCUS
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
                <li className="nav-item dropdown-container"
                    onMouseEnter={() => setShowGetAssistanceDropdown(true)}
                    onMouseLeave={() => setShowGetAssistanceDropdown(false)}>
                    <Link style={{color:"#333"}} to="/resource-directory" className="nav-link">
                        GET ASSISTANCE
                        <span className="dropdown-arrow">▼</span>
                    </Link>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <Link to="/educational-workshop" className="dropdown-item">EDUCATIONAL WORKSHOP</Link>
                            <Link to="/dispute-resolution" className="dropdown-item">DISPUTE RESOLUTION TIPS</Link>
                            <Link to="/resource-directory" className="dropdown-item highlighted">RESOURCE DIRECTORY</Link>
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
