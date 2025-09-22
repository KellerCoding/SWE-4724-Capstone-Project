import { Search } from "./Pages/Search.jsx"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <Router>
        <Routes>
            <Route path="/" element={<Search/>}/>
        </Routes>
    </Router>

)
}

export default App
