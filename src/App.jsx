import { Navbar } from "./Pages/Navbar.jsx"
import { Search } from "./Pages/Search.jsx"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { SubNavbar } from "./Pages/SubNavbar.jsx"
import { Homepage } from "./Pages/Homepage.jsx"
import { ScorecardIndividual } from "./Pages/ScorecardIndividual.jsx"
import { ResourceDirectory } from "./Pages/ResourceDirectory.jsx"
import {Footer} from "./Pages/Footer.jsx"
import { HospitalScore } from "./Pages/HospitalScore.jsx"

function App() {

  return (
    <Router>
        <div width="100%" style={{ backgroundColor: "#fff" }}>
            <Navbar/>
            <SubNavbar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/resource-directory" element={<ResourceDirectory/>}/>
                <Route path="/ScorecardIndividual" element={<ScorecardIndividual/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/hospital-score" element={<HospitalScore/>}/>
            </Routes>
            <Footer/>
        </div>
    </Router>
)
}

export default App
