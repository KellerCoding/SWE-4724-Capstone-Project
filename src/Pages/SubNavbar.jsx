import "./SubNavbar.css"
import gwatchLogo from "../assets/Images/gwatchlogo.png"

export function SubNavbar(){
    return (
        <nav className="subnavbar">
            <div className="logo-container">
                <div className="logo">
                    <div>
                        <img style={{width:"10rem"}} src={gwatchLogo} alt="Georgia Watch Logo" />
                    </div>
                </div>
            </div>
        </nav>
    )
}
