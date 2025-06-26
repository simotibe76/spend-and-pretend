import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";

function App() {
  const [started, setStarted] = useState(false);
  const [platea, setPlatea] = useState<any[]>([]);

  // Riceve la platea completa da StartScreen e fa partire il Game
  const handleGameStart = (initialPlatea: any[]) => {
    console.log("[DEBUG] Platea iniziale ricevuta:", initialPlatea);
    setPlatea(initialPlatea);
    setStarted(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
        {!started ? (
          <StartScreen onComplete={handleGameStart} />
        ) : (
          <Game platea={platea} />
        )}
      </div>
    </main>
  );
}

export default App;