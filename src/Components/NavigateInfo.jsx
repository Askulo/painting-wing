import React from "react";

const points = [
  "Use mouse or touch to rotate the scene.",
  "Double-tap to resize the Art Room.",
  "Click navigation titles to explore sections.",
  "Toggle music using the button on top-right.",
];

export default function NavigateInfo() {
  return (
    <div className="bg-transparent md:backdrop-blur-none backdrop-blur-xl  md:shadow-none shadow-lg"
      style={{
        position: "fixed",
        bottom: "32px",
        left: "32px",
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        // background: "rgba(255,255,255,0.18)",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.3)",
        padding: "20px 28px",
        minWidth: "260px",
        color: "#222",
        fontFamily: "inherit",
      }}
    >
      <h4 className="font-semibold text-lg mb-2 text-gray-800">How to Navigate</h4>
      <ul className="list-disc pl-5 space-y-1 text-gray-700 text-base">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
}