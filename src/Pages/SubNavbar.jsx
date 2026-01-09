import "./SubNavbar.css"
import gwatchLogo from "../assets/Images/gwatchlogo.png"
import { Link } from "react-router-dom"


export function SubNavbar(){


    const redirectToGAWatch = () => {
        window.location.href = 'https://www.georgiawatch.org/';
    };


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
        </nav>
    )
}
