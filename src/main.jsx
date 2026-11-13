import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Scorecard } from "./Pages/Scorecard.jsx";
import { Comparison } from "./Pages/Comparison.jsx";

// We are using this to resize the iframe on the host page and prevent content clipping and vertical scrollbars.

/**
 * Sends the current height of the document body to the parent window.
 */
function sendHeight() {
  const height = document.body.scrollHeight;
  window.parent.postMessage(
    { type: 'resize', height },
    '*'
  );
}

requestAnimationFrame(sendHeight);

const resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(sendHeight);
});

resizeObserver.observe(document.body);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
