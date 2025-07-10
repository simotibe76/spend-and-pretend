// src/components/StudioPlatea.tsx
import React from "react";
import "../styles/StudioPlatea.css";

interface Bot {
  name: string;
  gender: string;
}

interface StudioPlateaProps {
  bots: Bot[];
}

export default function StudioPlatea({ bots }: StudioPlateaProps) {
  return (
    <div className="studio-overlay">
      {bots.map((bot, i) => (
        <div key={i} className="seat-wrapper">
          <img
            src={bot.gender === "F" ? "/src/assets/female.png" : "/src/assets/male.png"}
            className="seat-icon"
            alt={bot.name}
          />
          <div className="seat-tooltip">{bot.name}</div>
        </div>
      ))}
    </div>
  );
}
