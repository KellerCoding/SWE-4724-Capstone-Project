import "./ResourceDirectory.css"
import { useNavigate } from "react-router-dom"
import GWatchTab1 from "../assets/Images/resourceDirectory/gwatchtab1.png"
import GWatchTab2 from "../assets/Images/resourceDirectory/gwatchtab2.png"
import GWatchTab3 from "../assets/Images/resourceDirectory/gwatchtab3.png"
import GWatchTab4 from "../assets/Images/resourceDirectory/gwatchtab4.png"
import GWatchTab5 from "../assets/Images/resourceDirectory/gwatchtab5.png"
import GWatchTab6 from "../assets/Images/resourceDirectory/gwatchtab6.png"    

export function ResourceDirectory(){
    const navigate = useNavigate()

    const handleHospitalAccountabilityClick = () => {
        navigate('/scorecard')
    }

    return(
        <div className="resource-directory">
            <div className="resource-header">
                <h1>Resource Directory</h1>
                <div className="header-line"></div>
            </div>
            
            <div className="resource-description">
                <p>Use this guide to jumpstart your research, explore avenues of advocacy you may be unfamiliar with, and connect with organizations working in your community.</p>
            </div>

            <div className="resource-grid">
                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab1} alt="Affordable Housing" />
                    </div>
                    <div className="card-content">
                        <h3>Affordable Housing</h3>
                        <button className="resource-btn">Click Here</button>
                    </div>
                </div>

                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab2} alt="Chronic Illness" />
                    </div>
                    <div className="card-content">
                        <h3>Chronic Illness</h3>
                        <button className="resource-btn">Click Here</button>
                    </div>
                </div>

                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab3} alt="Dental Health" />
                    </div>
                    <div className="card-content">
                        <h3>Dental Health</h3>
                        <button className="resource-btn">Click Here</button>
                    </div>
                </div>

                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab4}alt="Food Security" />
                    </div>
                    <div className="card-content">
                        <h3>Food Security</h3>
                        <button className="resource-btn">Click Here</button>
                    </div>
                </div>

                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab5} alt="Healthcare Access" />
                    </div>
                    <div className="card-content">
                        <h3>Healthcare Access</h3>
                        <button className="resource-btn">Click Here</button>
                    </div>
                </div>

                <div className="resource-card">
                    <div className="card-image">
                        <img src={GWatchTab6} alt="Hospital Accountability" />
                    </div>
                    <div className="card-content">
                        <h3>Hospital Accountability Scores</h3>
                        <button className="resource-btn" onClick={handleHospitalAccountabilityClick}>Click Here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}