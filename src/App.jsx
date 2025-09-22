import { Navbar } from "./Pages/Navbar.jsx"
import { Search } from "./Pages/Search.jsx"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { SubNavbar } from "./Pages/SubNavbar.jsx"


function App() {


  return (
    
    <Router>
        <div width="100%" style={{ backgroundColor: "#fff" }}>
            <Navbar/>
            <SubNavbar/>
            <Routes>
                {/* <Route path="/" element={<Search/>}/> */}
            </Routes>
        </div>
    </Router>

)
}

export default App
