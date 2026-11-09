// src/pages/Tooltip.jsx
import React from "react";

export default function Tooltip({
  content,
  children,
  position = "top",
  background = "#333",
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
