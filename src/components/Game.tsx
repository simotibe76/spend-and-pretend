import React, { useState, useEffect } from "react";
import { fetchProducts } from "../api/productsAPI";
import "../styles/game.css";
import ResultOverlay from "./ResultOverlay";
import StudioPlatea from "./StudioPlatea";

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

interface GameProps {
  platea: Contestant[];
}

export default function Game({ platea }: GameProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any | null>(null);
  const [playerBid, setPlayerBid] = useState("");
  const [botBids, setBotBids] = useState<any[]>([]);
  const [winner, setWinner] = useState<any | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bots, setBots] = useState<Contestant[]>([]);

  useEffect(() => {
    pickBots(platea);

    fetchProducts().then((data) => {
      setProducts(data);
      const first = data[Math.floor(Math.random() * data.length)];
      setProduct(first);
      console.log("[DEBUG] Prezzo reale:", first.price);
    });
  }, []);

  const pickBots = (fullPlatea: Contestant[]) => {
    const selected = fullPlatea.slice(0, 3);
    setBots(selected);
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
  };

  const nextProduct = () => {
    const next = products[Math.floor(Math.random() * products.length)];
    setProduct(next);
    setPlayerBid("");
    setBotBids([]);
    setWinner(null);
    setRevealed(false);
    pickBots(platea);
    console.log("[DEBUG] Prezzo reale:", next.price);
  };

  if (!product) return <p>Caricamento prodotti...</p>;

return (
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

    {/* 🎯 Platea sotto il pulsante */}
    <StudioPlatea bots={platea} />
  </div>
);

}
