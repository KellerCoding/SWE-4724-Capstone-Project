import "./SubNavbar.css"

export function SubNavbar(){
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
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        GET ASSISTANCE
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        ADVOCACY
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        SUPPORT US
                        <span className="dropdown-arrow">▼</span>
                    </a>
                </li>
            </ul>
            
            <div className="donate-container">
                <button className="donate-btn">DONATE</button>
            </div>
        </nav>
    )
}
