import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Scorecard} from "./Pages/Scorecard.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Scorecard/>
  </StrictMode>,
)
