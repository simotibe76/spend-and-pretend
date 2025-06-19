// src/components/Game.tsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsAPI";
import "../styles/game.css";

const getPriceOptions = (actualPrice: number): number[] => {
  const randomPercent = () => Math.random() * 0.6 + 0.2; // 20%–80%
  const low = Math.max(1, Math.floor(actualPrice * (1 - randomPercent())));
  const high = Math.floor(actualPrice * (1 + randomPercent()));
  const options = [actualPrice, low, high];
  return options.sort(() => Math.random() - 0.5);
};

export default function Game() {
  const [budget, setBudget] = useState(10000);
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showRetry, setShowRetry] = useState(false);
  const [isRetryActive, setIsRetryActive] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const first = data[Math.floor(Math.random() * data.length)];
      setProduct(first);
      setOptions(getPriceOptions(first.price));
    });
  }, []);

  const nextProduct = () => {
    const next = products[Math.floor(Math.random() * products.length)];
    setProduct(next);
    setOptions(getPriceOptions(next.price));
    setSelectedPrice(null);
    setAttempts(0);
    setShowRetry(false);
    setIsRetryActive(false);
    setFeedback("");
  };

  const handleChoice = (price: number) => {
    if (!product) return;
    if (price === product.price) {
      setFeedback("✅ Esatto! Passiamo al prossimo prodotto.");
      setTimeout(() => nextProduct(), 1500);
    } else {
      if (attempts === 0) {
        setSelectedPrice(price);
        setFeedback("❌ Sbagliato. Vuoi riprovare?");
        setShowRetry(true);
        setAttempts(1);
      } else {
        if (selectedPrice === null) return;
        const error1 = Math.abs(selectedPrice - product.price);
        const error2 = Math.abs(price - product.price);
        const totalError = error1 + error2;
        setBudget((prev) => prev - totalError);
        setFeedback(`❌ Sbagliato di nuovo. Prezzo corretto: €${product.price}. Hai perso €${totalError}.`);
        setTimeout(() => nextProduct(), 3000);
      }
    }
  };

  const skipRetry = () => {
    if (!product || selectedPrice === null) return;
    const error = Math.abs(selectedPrice - product.price);
    setBudget((prev) => prev - error);
    setFeedback(`💸 Ok, niente secondo tentativo. Prezzo corretto: €${product.price}. Hai perso €${error}.`);
    setTimeout(() => nextProduct(), 3000);
  };

  const retryAttempt = () => {
    if (!product) return;
    const updatedOptions = getPriceOptions(product.price);
    setOptions(updatedOptions);
    setShowRetry(false);
    setIsRetryActive(true);
    setFeedback("❓ Secondo tentativo: nuovo giro, nuova corsa!");
  };

  if (!product) return <p>Caricamento prodotti...</p>;

  return (
    <div className="game-container">
      <h1 className="game-title">💸 Spend & Pretend 💸</h1>
      <p className="game-subtitle">Indovina il prezzo dei prodotti... finché il budget tiene!</p>
      <p className="budget">Budget residuo: €{budget}</p>
      <img src={product.image} alt={product.title} className="product-image" />
      <p className="product-title">{product.title}</p>
      {options && options.length > 0 && (
        <div className="options">
          {options.map((price, index) => (
            <button
              key={index}
              className={`option-button ${isRetryActive ? "second-attempt" : ""}`}
              onClick={() => handleChoice(price)}
              disabled={feedback.includes("✅") || (showRetry && !isRetryActive)}
            >
              €{price.toFixed(2)}
            </button>
          ))}
        </div>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {showRetry && (
        <div className="retry-buttons">
          <button onClick={retryAttempt} className="retry-yes">Sì, voglio riprovare</button>
          <button onClick={skipRetry} className="retry-no">No, vai avanti</button>
        </div>
      )}
    </div>
  );
}
