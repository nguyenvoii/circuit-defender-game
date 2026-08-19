/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';

type GameState = 'start' | 'playing' | 'paused' | 'gameover';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('circuitDefenderHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [energy, setEnergy] = useState(100);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('circuitDefenderHighScore', score.toString());
    }
  }, [score, highScore]);

  const handleStart = () => {
    setScore(0);
    setEnergy(100);
    setLives(3);
    setGameState('playing');
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameState('gameover');
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleBackToMenu = () => {
    setGameState('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center p-4">
      {gameState === 'start' && (
        <StartScreen
          highScore={highScore}
          onStart={handleStart}
        />
      )}

      {gameState === 'playing' && (
        <GameCanvas
          onGameOver={handleGameOver}
          onPause={() => setGameState('paused')}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          onRestart={handleRestart}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
