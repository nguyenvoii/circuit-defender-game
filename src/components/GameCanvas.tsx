/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface GameCanvasProps {
  onGameOver: (score: number) => void;
  onPause: () => void;
}

interface Electron {
  x: number;
  y: number;
  vy: number;
  isJumping: boolean;
  isSliding: boolean;
  slideTimer: number;
}

interface Obstacle {
  x: number;
  y: number;
  type: 'insulator' | 'short_circuit' | 'circuit_breaker';
  width: number;
  height: number;
  passed: boolean;
}

interface Collectible {
  x: number;
  y: number;
  type: 'electron' | 'battery';
  radius: number;
  collected: boolean;
  pulse: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const GameCanvas = ({ onGameOver, onPause }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [lives, setLives] = useState(3);
  const [gameSpeed, setGameSpeed] = useState(5);

  const gameRef = useRef({
    electron: {
      x: 150,
      y: 0,
      vy: 0,
      isJumping: false,
      isSliding: false,
      slideTimer: 0
    } as Electron,
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    particles: [] as Particle[],
    lastObstacleTime: 0,
    lastCollectibleTime: 0,
    groundY: 0,
    wireY: 0,
    isGameOver: false,
    invincible: 0,
    combo: 0,
    comboTimer: 0
  });

  const WIRE_Y_RATIO = 0.6;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -14;
  const SLIDE_DURATION = 800;

  const createParticles = useCallback((
    x: number,
    y: number,
    color: string,
    count: number,
    spread: number = 50
  ) => {
    const game = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      game.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        maxLife: 0.8 + Math.random() * 0.4,
        color,
        size: 2 + Math.random() * 3
      });
    }
  }, []);

  const createSparkParticles = useCallback((x: number, y: number) => {
    const colors = ['#00d4ff', '#ffd700', '#ffffff', '#00ff88'];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5;
      gameRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1 + Math.random() * 2
      });
    }
  }, []);

  const playSound = useCallback((type: 'jump' | 'collect' | 'hit' | 'slide' | 'gameover') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      switch (type) {
        case 'jump':
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case 'collect':
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case 'hit':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case 'slide':
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case 'gameover':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(ctx.currentTime + 0.5);
          break;
      }
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  const handleInput = useCallback((action: 'jump' | 'slide') => {
    const game = gameRef.current;
    if (game.isGameOver) return;

    if (action === 'jump' && !game.electron.isJumping) {
      game.electron.vy = JUMP_FORCE;
      game.electron.isJumping = true;
      game.electron.isSliding = false;
      createParticles(game.electron.x, game.electron.y, '#00d4ff', 8);
      playSound('jump');
    } else if (action === 'slide' && !game.electron.isSliding && !game.electron.isJumping) {
      game.electron.isSliding = true;
      game.electron.slideTimer = SLIDE_DURATION;
      createParticles(game.electron.x, game.electron.y + 15, '#ffd700', 5);
      playSound('slide');
    }
  }, [createParticles, playSound]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') {
      e.preventDefault();
      handleInput('jump');
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      e.preventDefault();
      handleInput('slide');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onPause();
    }
  }, [handleInput, onPause]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = touch.clientY - rect.top;
    const halfHeight = rect.height / 2;

    if (y < halfHeight) {
      handleInput('jump');
    } else {
      handleInput('slide');
    }
  }, [handleInput]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const game = gameRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const maxWidth = Math.min(800, container.clientWidth - 32);
      const maxHeight = Math.min(500, window.innerHeight - 200);
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      game.groundY = canvas.height * 0.85;
      game.wireY = canvas.height * WIRE_Y_RATIO;
      game.electron.y = game.wireY;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Input handlers
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

    let animationFrameId: number;
    let lastTime = performance.now();
    let accumulator = 0;
    const fixedDelta = 1000 / 60;

    const spawnObstacle = (now: number) => {
      const types: Array<'insulator' | 'short_circuit' | 'circuit_breaker'> = ['insulator', 'short_circuit', 'circuit_breaker'];
      const type = types[Math.floor(Math.random() * types.length)];

      let width = 40, height = 40;
      let yOffset = 0;

      switch (type) {
        case 'insulator':
          width = 35;
          height = 50;
          yOffset = -10;
          break;
        case 'short_circuit':
          width = 45;
          height = 35;
          yOffset = 5;
          break;
        case 'circuit_breaker':
          width = 50;
          height = 40;
          yOffset = 0;
          break;
      }

      game.obstacles.push({
        x: canvas.width + 100,
        y: game.wireY + yOffset,
        type,
        width,
        height,
        passed: false
      });
    };

    const spawnCollectible = (now: number) => {
      const types: Array<'electron' | 'battery'> = ['electron', 'electron', 'electron', 'battery'];
      const type = types[Math.floor(Math.random() * types.length)];

      const isHigh = Math.random() > 0.5;
      const y = isHigh ? game.wireY - 80 : game.wireY + 20;

      game.collectibles.push({
        x: canvas.width + 100,
        y,
        type,
        radius: type === 'electron' ? 12 : 18,
        collected: false,
        pulse: 0
      });
    };

    const update = (deltaTime: number) => {
      if (game.isGameOver) return;

      // Update electron
      if (game.electron.isJumping) {
        game.electron.vy += GRAVITY;
        game.electron.y += game.electron.vy;

        if (game.electron.y >= game.wireY) {
          game.electron.y = game.wireY;
          game.electron.isJumping = false;
          game.electron.vy = 0;
        }
      }

      if (game.electron.isSliding) {
        game.electron.slideTimer -= deltaTime;
        if (game.electron.slideTimer <= 0) {
          game.electron.isSliding = false;
        }
      }

      if (game.invincible > 0) {
        game.invincible -= deltaTime;
      }

      if (game.comboTimer > 0) {
        game.comboTimer -= deltaTime;
        if (game.comboTimer <= 0) {
          game.combo = 0;
        }
      }

      // Update obstacles
      const now = performance.now();
      if (now - game.lastObstacleTime > 1500 - Math.min(score * 2, 800)) {
        spawnObstacle(now);
        game.lastObstacleTime = now;
      }

      game.obstacles.forEach(obs => {
        obs.x -= gameSpeed;

        // Collision detection
        if (!obs.passed && !game.invincible) {
          const electronHeight = game.electron.isSliding ? 20 : 30;
          const electronY = game.electron.isSliding ? game.electron.y + 10 : game.electron.y - 15;

          if (
            game.electron.x + 15 > obs.x &&
            game.electron.x - 15 < obs.x + obs.width &&
            electronY + electronHeight > obs.y &&
            electronY < obs.y + obs.height
          ) {
            // Collision!
            game.combo = 0;
            createSparkParticles(game.electron.x, game.electron.y);
            playSound('hit');

            if (obs.type === 'insulator') {
              setEnergy(prev => Math.max(0, prev - 25));
              game.invincible = 1000;
            } else if (obs.type === 'short_circuit') {
              setLives(prev => prev - 1);
              game.invincible = 1500;
            } else if (obs.type === 'circuit_breaker') {
              setEnergy(prev => Math.max(0, prev - 35));
              setLives(prev => prev - 1);
              game.invincible = 1500;
            }

            if (lives - (obs.type !== 'insulator' ? 1 : 0) <= 0) {
              game.isGameOver = true;
              playSound('gameover');
              setTimeout(() => onGameOver(score), 500);
            }
          }
        }

        if (obs.x + obs.width < game.electron.x - 20 && !obs.passed) {
          obs.passed = true;
          game.combo++;
          game.comboTimer = 1000;
          setScore(prev => prev + (10 + game.combo * 5));
        }
      });

      // Update collectibles
      if (now - game.lastCollectibleTime > 2000) {
        spawnCollectible(now);
        game.lastCollectibleTime = now;
      }

      game.collectibles.forEach(col => {
        col.x -= gameSpeed;
        col.pulse += 0.1;

        if (!col.collected) {
          const dx = game.electron.x - col.x;
          const dy = game.electron.y - col.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < col.radius + 15) {
            col.collected = true;
            createParticles(col.x, col.y, col.type === 'electron' ? '#00ff88' : '#ffd700', 12);
            playSound('collect');

            if (col.type === 'electron') {
              setEnergy(prev => Math.min(100, prev + 15));
              setScore(prev => prev + 25);
            } else {
              setLives(prev => prev + 1);
              setScore(prev => prev + 50);
            }
          }
        }
      });

      // Update particles
      game.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= deltaTime / p.maxLife;
      });

      // Clean up
      game.obstacles = game.obstacles.filter(obs => obs.x > -100);
      game.collectibles = game.collectibles.filter(col => col.x > -100);
      game.particles = game.particles.filter(p => p.life > 0);

      // Increase difficulty
      setGameSpeed(prev => Math.min(12, prev + 0.002));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circuit background
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw wire path
      ctx.strokeStyle = '#1a3a5a';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, game.wireY);
      ctx.lineTo(canvas.width, game.wireY);
      ctx.stroke();

      // Wire glow
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, game.wireY);
      ctx.lineTo(canvas.width, game.wireY);
      ctx.stroke();

      // Draw circuit elements on wire
      const time = performance.now() / 1000;
      for (let i = 0; i < canvas.width; i += 150) {
        const pulse = Math.sin(time * 3 + i * 0.02) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(i, game.wireY, 4 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw collectibles
      game.collectibles.forEach(col => {
        if (col.collected) return;

        const pulse = Math.sin(col.pulse) * 0.3 + 1;
        const radius = col.radius * pulse;

        // Glow
        const gradient = ctx.createRadialGradient(col.x, col.y, 0, col.x, col.y, radius * 2);
        gradient.addColorStop(0, col.type === 'electron' ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(col.x, col.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = col.type === 'electron' ? '#00ff88' : '#ffd700';
        ctx.beginPath();
        ctx.arc(col.x, col.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Symbol
        ctx.fillStyle = '#000';
        ctx.font = `bold ${radius * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(col.type === 'electron' ? 'e-' : '⚡', col.x, col.y);
      });

      // Draw obstacles
      game.obstacles.forEach(obs => {
        const gradient = ctx.createLinearGradient(obs.x, obs.y, obs.x, obs.y + obs.height);

        switch (obs.type) {
          case 'insulator':
            gradient.addColorStop(0, '#8b4513');
            gradient.addColorStop(1, '#654321');
            break;
          case 'short_circuit':
            gradient.addColorStop(0, '#ff6b35');
            gradient.addColorStop(1, '#cc4400');
            break;
          case 'circuit_breaker':
            gradient.addColorStop(0, '#4a5568');
            gradient.addColorStop(1, '#2d3748');
            break;
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Detail
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

        // Spark effect for short circuit
        if (obs.type === 'short_circuit') {
          for (let i = 0; i < 3; i++) {
            const sparkX = obs.x + Math.random() * obs.width;
            const sparkY = obs.y + Math.random() * obs.height;
            ctx.fillStyle = `rgba(255, ${200 + Math.random() * 55}, 0, ${Math.random()})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2 + Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw particles
      game.particles.forEach(p => {
        const alpha = p.life;
        ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw electron
      const electronY = game.electron.y;
      const electronHeight = game.electron.isSliding ? 20 : 30;

      // Glow effect
      const electronGradient = ctx.createRadialGradient(
        game.electron.x, electronY, 0,
        game.electron.x, electronY, 40
      );

      if (game.invincible > 0) {
        const flash = Math.floor(game.invincible / 100) % 2;
        electronGradient.addColorStop(0, flash ? 'rgba(255, 100, 100, 0.8)' : 'rgba(255, 215, 0, 0.8)');
      } else {
        electronGradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
      }
      electronGradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)');
      electronGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = electronGradient;
      ctx.beginPath();
      ctx.arc(game.electron.x, electronY, 40, 0, Math.PI * 2);
      ctx.fill();

      // Electron body
      ctx.fillStyle = game.invincible > 0
        ? (Math.floor(game.invincible / 100) % 2 ? '#ff6b6b' : '#ffd700')
        : '#00d4ff';
      ctx.beginPath();
      if (game.electron.isSliding) {
        ctx.ellipse(game.electron.x, electronY + 5, 20, 12, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(game.electron.x, electronY, 15, 0, Math.PI * 2);
      }
      ctx.fill();

      // Inner glow
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(game.electron.x - 4, electronY - 4, 5, 0, Math.PI * 2);
      ctx.fill();

      // Trail effect
      if (game.electron.isJumping || game.electron.isSliding) {
        for (let i = 1; i <= 5; i++) {
          const trailX = game.electron.x + i * 8;
          const trailAlpha = 0.4 - i * 0.08;
          ctx.fillStyle = `rgba(0, 212, 255, ${trailAlpha})`;
          ctx.beginPath();
          ctx.arc(trailX, electronY, 10 - i * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw UI overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 180, 80);
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 180, 80);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Điểm: ${score}`, 20, 35);

      ctx.fillStyle = '#00ff88';
      ctx.fillText(`Năng lượng: ${energy}%`, 20, 55);

      ctx.fillStyle = '#ffd700';
      ctx.fillText(`Mạng: ${'❤️'.repeat(lives)}`, 20, 75);

      // Combo display
      if (game.combo > 1) {
        ctx.fillStyle = `rgba(255, 215, 0, ${game.comboTimer / 1000})`;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${game.combo}x COMBO!`, canvas.width / 2, 50);
      }
    };

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      accumulator += deltaTime;

      while (accumulator >= fixedDelta) {
        update(fixedDelta);
        accumulator -= fixedDelta;
      }

      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onGameOver, onPause, handleKeyDown, handleTouchStart, score, energy, lives, gameSpeed, createParticles, createSparkParticles, playSound]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-2xl border-2 border-cyan-500 block mx-auto"
        style={{ touchAction: 'none' }}
      />
      <div className="mt-4 text-center text-gray-400 text-sm">
        <p>⬆️/Space/W: Nhảy | ⬇️/S: Trượt | Touch: Trên màn hình nhảy, dưới trượt</p>
      </div>
    </div>
  );
};

export default GameCanvas;
