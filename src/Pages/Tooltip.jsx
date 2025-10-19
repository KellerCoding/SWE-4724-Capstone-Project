// src/pages/Tooltip.jsx
import React from "react";
import "./Tooltip.css";

export default function Tooltip({
  content,
  children,
  position = "top",
  background = "#6fb353",
  color = "#fff",
  width = "200px"
}) {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-trigger">
        {children}
        <div
          className={`tooltip-box tooltip-${position}`}
          style={{ backgroundColor: background, color, width }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
