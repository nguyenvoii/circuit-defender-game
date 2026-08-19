/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface StartScreenProps {
  highScore: number;
  onStart: () => void;
}

const StartScreen = ({ highScore, onStart }: StartScreenProps) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-4 animate-pulse">
          CHẠY TRÊN DÂY ĐIỆN
        </h1>
        <p className="text-xl text-cyan-300">Circuit Defender</p>
      </div>

      {/* Electron Animation */}
      <div className="mb-8 relative h-32">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cyan-400 blur-xl"
          style={{
            opacity: 0.5 + Math.sin(pulse) * 0.3,
            transform: 'translate(-50%, -50%) scale(1 + Math.sin(pulse) * 0.2)'
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/50">
            e-
          </div>
        </div>
      </div>

      {/* Game Description */}
      <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 mb-8 border border-cyan-500/30">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎮 Cách Chơi</h2>
        <div className="text-left text-gray-300 space-y-3">
          <p>🔹 Bạn là một <span className="text-cyan-400 font-bold">electron</span> chạy trên dây điện</p>
          <p>🔹 Nhấn <span className="text-green-400">⬆️/Space/W</span> để <span className="text-green-400">nhảy</span> tránh vật cản</p>
          <p>🔹 Nhấn <span className="text-yellow-400">⬇️/S</span> để <span className="text-yellow-400">trượt</span> xuống</p>
          <p>🔹 Thu thập <span className="text-green-400">electron (e-)</span> để tăng năng lượng</p>
          <p>🔹 Thu thập <span className="text-yellow-400">pin (⚡)</span> để thêm mạng</p>
          <p>🔹 Tránh <span className="text-red-400">cách điện, đoản mạch, cầu dao</span></p>
          <p>🔹 Ghép combo để tăng điểm số!</p>
        </div>
      </div>

      {/* High Score */}
      <div className="mb-8">
        <div className="inline-block bg-yellow-500/20 backdrop-blur rounded-lg px-8 py-4 border border-yellow-500/50">
          <p className="text-yellow-400 text-lg">🏆 Điểm Cao Nhất</p>
          <p className="text-3xl font-bold text-yellow-300">{highScore}</p>
        </div>
      </div>

      {/* Obstacles Info */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
          <div className="text-3xl mb-2">🔌</div>
          <p className="text-red-400 font-bold text-sm">Cách Điện</p>
          <p className="text-gray-400 text-xs">-25 Năng Lượng</p>
        </div>
        <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-500/30">
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-orange-400 font-bold text-sm">Đoản Mạch</p>
          <p className="text-gray-400 text-xs">-1 Mạng</p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-500/30">
          <div className="text-3xl mb-2">🔧</div>
          <p className="text-gray-400 font-bold text-sm">Cầu Dao</p>
          <p className="text-gray-400 text-xs">-35 NL -1 Mạng</p>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xl text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105"
      >
        <span className="relative z-10">▶️ BẮT ĐẦU CHƠI</span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Mobile Instructions */}
      <div className="mt-6 text-gray-500 text-sm">
        <p>📱 Chạm phía trên để nhảy, phía dưới để trượt</p>
      </div>
    </div>
  );
};

export default StartScreen;
