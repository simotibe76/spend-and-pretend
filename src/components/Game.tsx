import React, { useState, useEffect } from "react";

import { fetchProducts } from "../api/productsAPI";
import "../styles/game.css";
import ResultOverlay from "./ResultOverlay";
import SeatMap from "./SeatMap";
import contestantsPool from "../data/contestantsPool";

function generateBotBid(actualPrice: number, level: string) {
  const variance = {
    scarso: 150,
    medio: 75,
    esperto: 25,
  }[level] || 100;
  const error = Math.floor(Math.random() * variance * 2) - variance;
  const bid = actualPrice + error;
  return Math.max(1, bid);
}

interface Contestant {
  name: string;
  region: string;
  level: string;
  gender: string;
}

export default function Game() {
  console.log("[DEBUG] Game montato");
  const [platea, setPlatea] = useState<Contestant[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any | null>(null);
  const [playerBid, setPlayerBid] = useState("");
  const [botBids, setBotBids] = useState<any[]>([]);
  const [winner, setWinner] = useState<any | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bots, setBots] = useState<Contestant[]>([]);

  useEffect(() => {
    const fullPlatea = buildPlatea();
    setPlatea(fullPlatea);
    logPlatea(fullPlatea);
    pickBots(fullPlatea);

    fetchProducts().then((data) => {
      setProducts(data);
      const first = data[Math.floor(Math.random() * data.length)];
      setProduct(first);
      if (process.env.NODE_ENV === "development") {
        console.log("[DEBUG] Prezzo reale:", first.price);
      }
    });
  }, []);

  const buildPlatea = () => {
    const shuffled = [...contestantsPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 79); // solo 79 bot, il primo slot è del player
  };

  const logPlatea = (pl: Contestant[]) => {
    console.table(
      pl.map((c, i) => ({
        Posto: i + 2,
        Nome: c.name,
        Regione: c.region,
        Livello: c.level,
        Genere: c.gender,
      }))
    );
  };

  const pickBots = (fullPlatea: Contestant[]) => {
    const selected = fullPlatea.slice(0, 3);
    setBots(selected);
    if (process.env.NODE_ENV === "development") {
      console.table(
        selected.map((bot, i) => ({
          "#": i + 1,
          Nome: bot.name,
          Regione: bot.region,
          Livello: bot.level,
          Sesso: bot.gender,
        }))
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !playerBid) return;

    const actualPrice = product.price;
    const allBids = [
      { name: "Tu", bid: Number(playerBid), isPlayer: true },
      ...bots.map((bot) => ({
        name: bot.name,
        bid: generateBotBid(actualPrice, bot.level),
      })),
    ];

    const validBids = allBids.filter((c) => c.bid <= actualPrice);
    let closest;
    if (validBids.length > 0) {
      closest = validBids.reduce((prev, curr) =>
        Math.abs(actualPrice - curr.bid) < Math.abs(actualPrice - prev.bid)
          ? curr
          : prev
      );
    } else {
      closest = { name: "Nessuno", bid: 0 };
    }

    setBotBids(allBids.slice(1));
    setWinner(closest);
    setRevealed(true);
    setPlatea((prev) => prev.slice(3));
  };

  const nextProduct = () => {
    const next = products[Math.floor(Math.random() * products.length)];
    setProduct(next);
    setPlayerBid("");
    setBotBids([]);
    setWinner(null);
    setRevealed(false);
    pickBots(platea);
    if (process.env.NODE_ENV === "development") {
      console.log("[DEBUG] Prezzo reale:", next.price);
    }
  };

  if (!product) return <p>Caricamento prodotti...</p>;

  return (
    <>
    

      <div className="game-container">
        <h1 className="game-title">🎭 Spend & Pretend: Contestants’ Row</h1>
        <p className="game-subtitle">
          Fai la tua offerta senza sforare, vediamo chi ci va più vicino!
        </p>

        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <p className="product-title">{product.title}</p>

        {!revealed ? (
          <form onSubmit={handleSubmit} className="guess-form">
            <input
              type="number"
              value={playerBid}
              onChange={(e) => setPlayerBid(e.target.value)}
              placeholder="Il tuo prezzo (€)"
              className="price-input"
            />
            <button type="submit" className="option-button">
              Invia Offerta
            </button>
          </form>
        ) : (
          <ResultOverlay
            actualPrice={product.price}
            playerBid={Number(playerBid)}
            botBids={botBids}
            winner={winner}
            onClose={nextProduct}
          />
        )}
      </div>
<div className="platea-overlay-game">
  <SeatMap
    occupiedSeats={[0, ...platea.map((_, i) => i + 1)]}
    botsInGioco={bots.map((b) => b.name)}
    fullPlatea={[{ name: "Tu", gender: "M" }, ...platea]}  
  />
</div>

    </>

  );
}
