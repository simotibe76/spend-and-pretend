// src/components/StartScreen.jsx

import React, { useEffect, useRef, useState } from 'react';
import ItalySVG from '../assets/italyHigh.svg?react';
import contestantsPool from '../data/contestantsPool';
import '../styles/StartScreen.css';
import SeatMap from './SeatMap';
import '../styles/SeatMap.css';

export default function StartScreen({ onRegionConfirmed }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [platea, setPlatea] = useState([]);
  const [visiblePlatea, setVisiblePlatea] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [seatCounter, setSeatCounter] = useState(0);
  const mapRef = useRef(null);
  const freakyInterval = useRef(null);
  const badgeContainerRef = useRef(null);
  const overlayRef = useRef(null);

  const regionTiers = {
    nord: ["Valle d'Aosta", "Piemonte", "Lombardia", "Trentino-Alto Adige", "Veneto", "Friuli-Venezia Giulia", "Liguria", "Emilia-Romagna"],
    centro: ["Toscana", "Marche", "Umbria", "Lazio", "Abruzzo", "Sardegna"],
    sud: ["Molise", "Campania", "Puglia", "Basilicata", "Calabria", "Sicilia"]
  };

  useEffect(() => {
    freakyInterval.current = setInterval(() => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll('path[title]');
      const randomIndex = Math.floor(Math.random() * paths.length);
      const target = paths[randomIndex];
      if (!target) return;

      target.classList.add('freaky');
      setTimeout(() => target.classList.remove('freaky'), 1000);
    }, 1200);
    return () => clearInterval(freakyInterval.current);
  }, []);

  const handleMouseOver = (e) => {
    const title = e.target.getAttribute('title');
    if (title) setHoveredRegion(title);
  };

  const handleMouseOut = () => setHoveredRegion(null);

  const handleClick = (e) => {
    const regionName = e.target.getAttribute('title');
    if (!regionName) return;
    setSelectedRegion(regionName);
    console.log(`[DEBUG] Regione selezionata: ${regionName}`);
  };

  const handleConfirm = () => {
    if (!playerName.trim()) return;
    const playerData = { name: playerName.trim(), region: selectedRegion };
    const newPlatea = buildPlatea(selectedRegion);
    setPlatea(newPlatea);
    clearInterval(freakyInterval.current);
    animateMultiRegions(newPlatea, playerData);
  };

  function buildPlatea(playerRegion, total = 80) {
    const fullPool = [...contestantsPool];
    const platea = [];
    const regionalBots = fullPool.filter(c => c.region === playerRegion);
    const selectedRegional = shuffle(regionalBots).slice(0, 10);
    platea.push(...selectedRegional);

    const otherRegions = [...new Set(fullPool.map(c => c.region).filter(r => r !== playerRegion))];
    const usedNames = new Set(platea.map(c => c.name));

    while (platea.length < total) {
      const nextRegion = otherRegions[Math.floor(Math.random() * otherRegions.length)];
      const regionCandidates = shuffle(fullPool.filter(c => c.region === nextRegion && !usedNames.has(c.name)));
      const howMany = Math.min(2 + Math.floor(Math.random() * 3), total - platea.length);
      const selected = regionCandidates.slice(0, howMany);
      selected.forEach(c => usedNames.add(c.name));
      platea.push(...selected);
    }
    return platea;
  }

  function shuffle(array) {
    return [...array].sort(() => 0.5 - Math.random());
  }

  function highlightRegion(region) {
    const safeRegion = CSS.escape(region);
    const path = mapRef.current?.querySelector(`path[title='${safeRegion}']`);
    if (path) path.classList.add("highlighted");
  }

  function unhighlightRegion(region) {
    const safeRegion = CSS.escape(region);
    const path = mapRef.current?.querySelector(`path[title='${safeRegion}']`);
    if (path) path.classList.remove("highlighted");
  }

  function animateMultiRegions(fullPlatea, playerData) {
    const grouped = {};
    for (const bot of fullPlatea) {
      if (!grouped[bot.region]) grouped[bot.region] = [];
      grouped[bot.region].push(bot);
    }
    const regions = Object.keys(grouped);
    const order = [...regionTiers.nord, ...regionTiers.centro, ...regionTiers.sud].filter(r => regions.includes(r));
    let index = 0;

    setAnimating(true);
    function next() {
      if (index >= order.length) {
        setAnimating(false);
        console.log("🎬 Platea completa!");
        onRegionConfirmed(playerData);
        return;
      }
      const region = order[index];
      const bots = grouped[region];
      highlightRegion(region);

      const overlay = overlayRef.current;
      const path = mapRef.current?.querySelector(`path[title='${CSS.escape(region)}']`);
      if (path && overlay) {
        const mapRect = mapRef.current.getBoundingClientRect();
        const regionRect = path.getBoundingClientRect();
        const offset = regionRect.top - mapRect.top - 30;
        overlay.style.top = `${Math.max(offset, 0)}px`;
        console.log(`[DEBUG] Sposto overlay per ${region} a top: ${overlay.style.top}`);
      }

      bots.forEach((bot, i) => {
        setTimeout(() => flyBadge(bot), i * 200);
      });

      setTimeout(() => {
        unhighlightRegion(region);
        index++;
        setTimeout(next, 1300);
      }, 1300 + bots.length * 200);
    }
    next();
  }

  function flyBadge(bot) {
    const path = mapRef.current?.querySelector(`path[title='${CSS.escape(bot.region)}']`);
    const overlay = overlayRef.current;
    if (!path || !badgeContainerRef.current || !overlay) return;

    const pathRect = path.getBoundingClientRect();
    const mapRect = mapRef.current.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    const startX = pathRect.left - mapRect.left + pathRect.width / 2;
    const startY = pathRect.top - mapRect.top + pathRect.height / 2;
    const targetY = overlayRect.bottom - mapRect.top - 20;
    const deltaY = startY - targetY;

    const badge = document.createElement("div");
    badge.className = "bot-badge";
    badge.textContent = bot.name;
    badge.style.left = `${startX}px`;
    badge.style.top = `${startY}px`;
    badge.style.transform = `translate(-50%, 0)`;
    badge.style.transition = "transform 1.2s ease, opacity 1.2s ease";
    badgeContainerRef.current.appendChild(badge);

    void badge.offsetWidth;
    badge.style.transform = `translate(-50%, -${deltaY}px)`;
    badge.style.opacity = "0";

    setTimeout(() => {
      badge.remove();
      setVisiblePlatea(prev => [...prev, bot]);
      setSeatCounter(prev => prev + 1);
    }, 1300);
  }

  return (
    <div className="start-screen">
      <h1 className="start-title">🇮🇹 Benvenuto a Spend & Pretend</h1>

      {selectedRegion && !animating && visiblePlatea.length === 0 && (
        <div className="identity-form">
          <h2 className="text-2xl font-bold mb-4">📍 Regione selezionata: {selectedRegion}</h2>
          <label className="block mb-2 text-lg">Come ti chiami?</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Il tuo nome completo"
            className="px-4 py-2 rounded-lg border border-gray-400 shadow w-full max-w-md"
          />
          <button
            onClick={handleConfirm}
            disabled={!playerName.trim()}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
          >
            Invitiamo gli altri partecipanti
          </button>
        </div>
      )}

      <div
        className="map-wrapper"
        ref={mapRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={selectedRegion ? undefined : handleClick}
      >
        <ItalySVG className="w-full h-auto cursor-pointer" />
        <div className="badge-container" ref={badgeContainerRef}></div>
      </div>

      {hoveredRegion && !selectedRegion && <p className="region-highlight">🧭 {hoveredRegion}</p>}

      {animating && (
        <div className="platea-overlay" ref={overlayRef}>
          <SeatMap occupiedSeats={visiblePlatea.map((_, i) => i + 1)} />
        </div>
      )}
    </div>
  );
}
