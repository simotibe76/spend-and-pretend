import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';

function App() {
  const [started, setStarted] = useState(false);

  function handleRegionConfirmed(playerData: any) {
    console.log("[DEBUG] Dati del giocatore confermati:", playerData);
    setStarted(true);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
        {!started ? (
          <StartScreen onRegionConfirmed={handleRegionConfirmed} />
        ) : (
          <Game />
        )}
      </div>
    </main>
  );
}

export default App;
