/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverScreen = ({ score, highScore, onRestart, onBackToMenu }: GameOverScreenProps) => {
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [sparkle, setSparkle] = useState(0);

  useEffect(() => {
    setIsNewHighScore(score >= highScore && score > 0);
  }, [score, highScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkle(prev => (prev + 0.2) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getScoreMessage = () => {
    if (score === 0) return 'Chưa bắt đầu!';
    if (score < 100) return 'Cố gắng hơn nhé!';
    if (score < 300) return 'Khá tốt!';
    if (score < 500) return 'Tuyệt vời!';
    if (score < 1000) return 'Đỉnh cao!';
    return 'Huyền thoại!';
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      {/* Game Over Title */}
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-red-500 mb-2 animate-pulse">
          KẾT THÚC
        </h1>
        <p className="text-xl text-gray-400">Dòng điện đã bị ngắt...</p>
      </div>

      {/* Score Card */}
      <div className="bg-gray-800/70 backdrop-blur rounded-xl p-8 mb-6 border-2 border-red-500/50 shadow-2xl">
        <div className="mb-6">
          <p className="text-gray-400 text-lg mb-2">Điểm Số Của Bạn</p>
          <p className="text-6xl font-bold text-white">{score}</p>
        </div>

        {isNewHighScore && score > 0 && (
          <div className="mb-6 bg-yellow-500/20 rounded-lg p-4 border border-yellow-500">
            <div className="flex items-center justify-center gap-2">
              <span
                className="text-2xl"
                style={{
                  opacity: 0.7 + Math.sin(sparkle) * 0.3,
                  transform: `scale(${1 + Math.sin(sparkle) * 0.1})`
                }}
              >
                ⭐
              </span>
              <p className="text-yellow-400 font-bold text-xl">KỆT LỤC MỚI!</p>
              <span
                className="text-2xl"
                style={{
                  opacity: 0.7 + Math.cos(sparkle) * 0.3,
                  transform: `scale(${1 + Math.cos(sparkle) * 0.1})`
                }}
              >
                ⭐
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Điểm Cao Nhất</p>
            <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Đánh Giá</p>
            <p className="text-lg font-bold text-cyan-400">{getScoreMessage()}</p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-gray-900/50 rounded-lg p-4 text-left">
          <p className="text-gray-400 text-sm mb-2">Phân tích hiệu suất:</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tỷ lệ với điểm cao:</span>
              <span className="text-cyan-400">
                {highScore > 0 ? `${Math.round((score / highScore) * 100)}%` : 'N/A'}
              </span>
            </div>
            {score >= 100 && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Trình độ:</span>
                  <span className="text-green-400">
                    {score < 300 ? 'Người mới' : score < 500 ? 'Khá' : score < 1000 ? 'Chuyên gia' : 'Bậc thầy'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105"
        >
          🔄 CHƠI LẠI
        </button>

        <button
          onClick={onBackToMenu}
          className="w-full px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-bold text-lg text-white shadow-lg hover:scale-105 transition-all duration-300"
        >
          🏠 TRỞ VỀ MENU CHÍNH
        </button>
      </div>

      {/* Encouragement */}
      <div className="mt-6 text-gray-500 text-sm">
        {score < highScore ? (
          <p>💪 Cố lên! Bạn chỉ còn cách {highScore - score} điểm để phá kỷ lục!</p>
        ) : (
          <p>🎉 Bạn đã làm rất tốt! Hãy thử phá vỡ kỷ lục của chính mình!</p>
        )}
      </div>
    </div>
  );
};

export default GameOverScreen;
