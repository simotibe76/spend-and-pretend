import React from "react";
import "./ResultOverlay.css";

interface ResultOverlayProps {
  actualPrice: number;
  playerBid: number;
  botBids: { name: string; bid: number }[];
  winner: { name: string; bid: number };
  onClose: () => void;
}

export default function ResultOverlay({ actualPrice, playerBid, botBids, winner, onClose }: ResultOverlayProps) {
  const allBids = [{ name: "Tu", bid: playerBid }, ...botBids];

  return (
    <div className="overlay">
      <div className="overlay-box">
        <h2>💡 Risultati</h2>
        <p><strong>Prezzo reale:</strong> €{actualPrice}</p>
        <ul>
          {allBids.map((c) => {
            const diff = (c.bid - actualPrice).toFixed(2);
            const sforato = c.bid > actualPrice;
            const label = sforato ? "❌ Sforato" : "✅ OK";
            const diffLabel = `${sforato ? "+" : "-"}€${Math.abs(Number(diff)).toFixed(2)}`;
            return (
              <li key={c.name}>
                {c.name}: €{c.bid} {" "}
                <span style={{ color: sforato ? "red" : "green" }}>
                  ({diffLabel}) {label}
                </span>
              </li>
            );
          })}
        </ul>
        <h3>🏆 Vincitore: {winner.name} ({winner.bid}€)</h3>
        <button onClick={onClose}>Prossimo Prodotto</button>
      </div>
    </div>
  );
}
