import { Navbar } from "./Pages/Navbar.jsx"
import { Search } from "./Pages/Search.jsx"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { SubNavbar } from "./Pages/SubNavbar.jsx"
import { Homepage } from "./Pages/Homepage.jsx"
import { Scorecard } from "./Pages/Scorecard.jsx"
import { ResourceDirectory } from "./Pages/ResourceDirectory.jsx"
import {Footer} from "./Pages/Footer.jsx"
import { HospitalScore } from "./Pages/HospitalScore.jsx"
import GeorgiaMap from "./Pages/GeorgiaMap.jsx"
import { Comparison } from "./Pages/Comparison.jsx"
import { HealthcareAccess } from "./Pages/HealthcareAccess.jsx"

function App() {

  return (
    <Router>
        <div width="100%" style={{ backgroundColor: "#fff" }}>
            <Navbar/>
            <SubNavbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/resource-directory" element={<ResourceDirectory/>}/>
                <Route path="/scorecard" element={<Scorecard/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/hospital-score/:hospitalId" element={<HospitalScore/>}/>
                <Route path="/georgia-map/:hospitalId?" element={<GeorgiaMap />} />
                <Route path="/comparison" element={<Comparison/>}></Route>
                <Route path="/healthcare-access" element={<HealthcareAccess/>}></Route>
            </Routes>
            <Footer/>
        </div>
    </Router>
)
}

export default App;
