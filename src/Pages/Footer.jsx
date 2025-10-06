import "./Footer.css"
export function Footer(){
    return (
        <div>
            <div className="footer-1">
                <nav>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a style={{color:"#F48810"}} href="" className="nav-link">Get Assistance</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">Support Us</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">Site Map</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">Legal/Privacy</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="footer-2">
                <p style={{color:"white"}}>Georgia Watch is a non-profit, nonpartisan 501(c)3 organization. © 2024 Georgia Watch. All Rights Reserved. </p>
            </div>
        </div>
        
    )
}