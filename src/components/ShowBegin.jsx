// src/components/ShowBegin.jsx

import React, { useState } from "react";
import contestantsPool from "../data/contestantsPool";
import "../styles/ShowBegin.css";

export default function ShowBegin({ onStart }) {
  const [selected, setSelected] = useState([]);
 const audience = React.useMemo(() => {
  const shuffled = [...contestantsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 80);
}, []);


const handleSelect = (name) => {
  if (selected.includes(name)) return;
  if (selected.length >= 3) return;

  const selectedContestant = audience.find(c => c.name === name);
  if (selectedContestant) {
    console.log(`[DEBUG] Selezionato:`, {
      Nome: selectedContestant.name,
      Regione: selectedContestant.region,
      Livello: selectedContestant.level,
      Sesso: selectedContestant.gender,
    });
  }

  setSelected([...selected, name]);
};


  return (

<div className="show-begin">
  <h1>🎤 Spend & Pretend</h1>
  <p>Seleziona 3 sfidanti dal nostro pubblico!</p>

  <div className="audience-grid">
    {audience.map((c) => (
      <button
        key={c.name}
        onClick={() => handleSelect(c.name)}
        className={`audience-button ${c.gender === "F" ? "female" : "male"} ${
          selected.includes(c.name) ? "selected" : ""
        }`}
      >
        {c.name}
      </button>
    ))}
  </div>

  {selected.length === 3 && (
    <button onClick={() => onStart(selected)} className="start-button">
      Inizia la sfida
    </button>
  )}
</div>

  );
}
