// src/components/Game.tsx
import React, { useState } from "react";
import { mockProducts } from "../data/mockProducts";
import "../styles/game.css";

const getRandomProduct = () => {
  const index = Math.floor(Math.random() * mockProducts.length);
  return mockProducts[index];
};

const generateOptions = (price: number) => {
  const low = Math.floor(price * (1 - (0.2 + Math.random() * 0.2)));
  const high = Math.floor(price * (1 + (0.6 + Math.random() * 0.2)));
  const options = [price, low, high];
  return options.sort(() => Math.random() - 0.5);
};

export default function Game() {
  const [budget, setBudget] = useState(10000);
  const [product, setProduct] = useState(getRandomProduct());
  const [options, setOptions] = useState(generateOptions(product.price));
  const [attempts, setAttempts] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showRetry, setShowRetry] = useState(false);

  const handleChoice = (price: number) => {
    if (price === product.price) {
      setFeedback("✅ Esatto! Passiamo al prossimo prodotto.");
      setTimeout(() => {
        nextProduct();
      }, 1500);
    } else {
      if (attempts === 0) {
        setSelectedPrice(price);
        setFeedback("❌ Sbagliato. Vuoi riprovare?");
        setShowRetry(true);
        setAttempts(1);
      } else {
        const error1 = Math.abs(selectedPrice! - product.price);
        const error2 = Math.abs(price - product.price);
        const totalError = error1 + error2;
        setBudget(budget - totalError);
        setFeedback(`❌ Sbagliato di nuovo. Prezzo corretto: €${product.price}. Hai perso €${totalError}.`);
        setTimeout(() => {
          nextProduct();
        }, 3000);
      }
    }
  };

  const skipRetry = () => {
    const error = Math.abs(selectedPrice! - product.price);
    setBudget(budget - error);
    setFeedback(`💸 Ok, niente secondo tentativo. Prezzo corretto: €${product.price}. Hai perso €${error}.`);
    setTimeout(() => {
      nextProduct();
    }, 3000);
  };

  const nextProduct = () => {
    const newProduct = getRandomProduct();
    setProduct(newProduct);
    setOptions(generateOptions(newProduct.price));
    setSelectedPrice(null);
    setAttempts(0);
    setShowRetry(false);
    setFeedback("");
  };

  return (
  <div className="game-container">
    <h1 className="game-title">💸 Spend & Pretend 💸</h1>
    <p className="game-subtitle">Indovina il prezzo dei prodotti... finché il budget tiene!</p>
    <p className="game-budget">💰 Budget residuo: €{budget}</p>
      <img
        src={product.image}
        alt={product.name}
        className="game-image"
      />
      <p className="game-question">Quanto costa questo prodotto?</p>
      <div className="game-options">
        {options.map((price, index) => (
          <button
            key={index}
            className="game-button"
            onClick={() => handleChoice(price)}
            disabled={feedback.includes("✅") || (attempts > 0 && !showRetry)}
          >
            €{price}
          </button>
        ))}
      </div>
      {feedback && <p className="game-feedback">{feedback}</p>}
      {showRetry && (
        <div className="game-retry">
          <button onClick={() => { setShowRetry(false); setAttempts(0); setFeedback(""); }} className="retry-button yes">Sì, voglio riprovare</button>
          <button onClick={skipRetry} className="retry-button no">No, vai avanti</button>
        </div>
      )}
    </div>
  );
}
