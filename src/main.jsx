import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HospitalScore} from "./Pages/HospitalScore.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HospitalScore/>
  </StrictMode>,
)