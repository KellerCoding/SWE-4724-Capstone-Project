import "./SubNavbar.css"
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
                    <a href="" className="nav-link">
                        OUR FOCUS
                        <span className="dropdown-arrow">▼</span>
                    </a>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <a href="" className="dropdown-item">EDUCATIONAL WORKSHOP</a>
                            <a href="" className="dropdown-item">DISPUTE RESOLUTION TIPS</a>
                            <a href="" className="dropdown-item">RESOURCE DIRECTORY</a>
                        </div>
                    )}
                </li>
                <div onMouseEnter={() => setShowGetAssistanceDropdown(true)}
                    onMouseLeave={() => setShowGetAssistanceDropdown(false)}>
                <li className="nav-item dropdown-container" 
                    >
                    <a href="" className="nav-link">
                        GET ASSISTANCE
                        <span className="dropdown-arrow">▼</span>
                    </a>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <a href="" className="dropdown-item">EDUCATIONAL WORKSHOP</a>
                            <a href="" className="dropdown-item">DISPUTE RESOLUTION TIPS</a>
                            <a href="" className="dropdown-item">RESOURCE DIRECTORY</a>
                        </div>
                    )}
                </li>
                </div>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        ADVOCACY
                        <span className="dropdown-arrow">▼</span>
                    </a>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <a href="" className="dropdown-item">EDUCATIONAL WORKSHOP</a>
                            <a href="" className="dropdown-item">DISPUTE RESOLUTION TIPS</a>
                            <a href="" className="dropdown-item">RESOURCE DIRECTORY</a>
                        </div>
                    )}
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        SUPPORT US
                        <span className="dropdown-arrow">▼</span>
                    </a>
                    {showGetAssistanceDropdown && (
                        <div className="dropdown-menu">
                            <a href="" className="dropdown-item">EDUCATIONAL WORKSHOP</a>
                            <a href="" className="dropdown-item">DISPUTE RESOLUTION TIPS</a>
                            <a href="" className="dropdown-item">RESOURCE DIRECTORY</a>
                        </div>
                    )}
                </li>
            </ul>
            
            <div className="donate-container">
                <button className="donate-btn" onClick={handleDonateClick}>DONATE</button>
            </div>
        </nav>
    )
}
