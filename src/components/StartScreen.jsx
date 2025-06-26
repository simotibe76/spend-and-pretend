// src/components/StartScreen.jsx

import React, { useEffect, useRef, useState } from 'react';
import ItalySVG from '../assets/italyHigh.svg?react';
import contestantsPool from '../data/contestantsPool';
import SeatMap from './SeatMap';
import '../styles/StartScreen.css';
import '../styles/SeatMap.css';

export default function StartScreen({ onComplete }) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [visiblePlatea, setVisiblePlatea] = useState([]);
  const [animating, setAnimating] = useState(false);

  const mapRef = useRef(null);
  const badgeContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const freakyInterval = useRef(null);
  const lastOverlayTop = useRef(0);

  const regionTiers = {
    nord: ["Valle d'Aosta","Piemonte","Lombardia","Trentino-Alto Adige","Veneto","Friuli-Venezia Giulia","Liguria","Emilia-Romagna"],
    centro: ["Toscana","Marche","Umbria","Lazio","Abruzzo","Sardegna"],
    sud: ["Molise","Campania","Puglia","Basilicata","Calabria","Sicilia"]
  };

  // Effetto freaky sulle regioni
  useEffect(() => {
    freakyInterval.current = setInterval(() => {
      if (!mapRef.current) return;
      const paths = mapRef.current.querySelectorAll('path[title]');
      const idx = Math.floor(Math.random() * paths.length);
      const tgt = paths[idx];
      if (!tgt) return;
      tgt.classList.add('freaky');
      setTimeout(() => tgt.classList.remove('freaky'), 800);
    }, 1000);
    return () => clearInterval(freakyInterval.current);
  }, []);

  const handleMouseOver = (e) => {
    const title = e.target.getAttribute('title');
    if (title) setHoveredRegion(title);
  };
  const handleMouseOut = () => setHoveredRegion(null);

  const handleRegionClick = (e) => {
    const region = e.target.getAttribute('title');
    if (!region) return;
    setSelectedRegion(region);
    console.log(`[DEBUG] Regione selezionata: ${region}`);
  };

  const buildPlatea = (region) => {
    const pool = [...contestantsPool];
    const platea = [];
    // primi 10 dalla regione
    platea.push(...shuffle(pool.filter(c=>c.region===region)).slice(0,10));
    // poi gli altri fino a 80
    const used = new Set(platea.map(c=>c.name));
    const regions = [...new Set(pool.map(c=>c.region))].filter(r=>r!==region);
    while (platea.length < 80) {
      const r = regions[Math.floor(Math.random()*regions.length)];
      const candidates = shuffle(pool.filter(c=>c.region===r && !used.has(c.name)));
      const take = Math.min(2+Math.floor(Math.random()*3), 80-platea.length);
      const slice = candidates.slice(0,take);
      slice.forEach(c=>used.add(c.name));
      platea.push(...slice);
    }
    return platea;
  };
  const shuffle = arr => [...arr].sort(()=>0.5-Math.random());

  const animatePlatea = (platea) => {
    const grouped = platea.reduce((g,b)=>{ (g[b.region]||(g[b.region]=[])).push(b); return g; }, {});
    const order = [...regionTiers.nord,...regionTiers.centro,...regionTiers.sud]
      .filter(r=>grouped[r]);
    let i = 0;
    setAnimating(true);

    const next = () => {
      if (i>=order.length) {
        setAnimating(false);
        console.log("🎬 Platea completa!");
        onComplete(platea);
        return;
      }
      const reg = order[i], bots = grouped[reg];
      highlightReg(reg);
      adjustOverlay(reg);
      bots.forEach((b,k)=>setTimeout(()=>flyBadge(b), k*200));
      setTimeout(()=>{
        unhighlightReg(reg);
        i++;
        next();
      }, 1000 + bots.length*200);
    };
    next();
  };
  const highlightReg = (r) => {
    const p = mapRef.current?.querySelector(`path[title='${CSS.escape(r)}']`);
    if (p) p.classList.add('highlighted');
  };
  const unhighlightReg = (r) => {
    const p = mapRef.current?.querySelector(`path[title='${CSS.escape(r)}']`);
    if (p) p.classList.remove('highlighted');
  };
  const adjustOverlay = (r) => {
    const p = mapRef.current?.querySelector(`path[title='${CSS.escape(r)}']`);
    const ov = overlayRef.current;
    if (p && ov) {
      const mr = mapRef.current.getBoundingClientRect();
      const pr = p.getBoundingClientRect();
      const off = pr.top - mr.top - 30;
      if (off > lastOverlayTop.current) {
        ov.style.top = `${off}px`;
        lastOverlayTop.current = off;
      }
    }
  };
  const flyBadge = (bot) => {
    const p = mapRef.current.querySelector(`path[title='${CSS.escape(bot.region)}']`);
    if (!p) return;
    const mr = mapRef.current.getBoundingClientRect();
    const pr = p.getBoundingClientRect();
    const ov = overlayRef.current.getBoundingClientRect();
    const sx = pr.left - mr.left + pr.width/2;
    const sy = pr.top - mr.top + pr.height/2;
    const ty = ov.bottom - mr.top - 20;
    const dy = sy - ty;
    const bd = document.createElement('div');
    bd.className = 'bot-badge';
    bd.textContent = bot.name;
    bd.style.left = `${sx}px`;
    bd.style.top = `${sy}px`;
    badgeContainerRef.current.append(bd);
    void bd.offsetWidth;
    bd.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    bd.style.transform = `translate(-50%,-${dy}px)`;
    bd.style.opacity = '0';
    setTimeout(()=>bd.remove(),1300);
  };

  const handleConfirm = () => {
    if (!playerName.trim()) return;
    const plateaArr = buildPlatea(selectedRegion);
    clearInterval(freakyInterval.current);
    animatePlatea(plateaArr);
  };

  return (
    <div className="start-screen">
      <h1 className="start-title">🇮🇹 Spend & Pretend</h1>

      {!selectedRegion && <p className="hover-label">Seleziona la tua regione!</p>}
      {selectedRegion && !animating && (
        <div className="identity-form">
          <h2>📍 Regione: {selectedRegion}</h2>
          <input
            value={playerName}
            onChange={e=>setPlayerName(e.target.value)}
            placeholder="Il tuo nome"
            className="name-input"
          />
          <button onClick={handleConfirm} disabled={!playerName.trim()}>
            Invita partecipanti
          </button>
        </div>
      )}

      <div
        className="map-wrapper"
        ref={mapRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleRegionClick}
      >
        <ItalySVG className="w-full h-auto cursor-pointer" />
        <div ref={badgeContainerRef} className="badge-container" />
      </div>

      {hoveredRegion && !selectedRegion && (
        <p className="region-highlight">🧭 {hoveredRegion}</p>
      )}

      {animating && (
        <div className="platea-overlay" ref={overlayRef}>
          <SeatMap occupiedSeats={visiblePlatea.map((_,i)=>i+1)} />
        </div>
      )}
    </div>
  );
}
