import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, LogOut } from 'lucide-react';

interface PacmanCamouflageProps {
  onClose: () => void;
}

export const PacmanCamouflage: React.FC<PacmanCamouflageProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);

  const initialMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,1,0,1],
    [1,0,0,0,1,1,2,1,1,0,0,0,0,0,1],
    [1,1,1,0,1,2,2,2,1,0,1,1,1,0,1],
    [1,0,0,0,1,2,2,2,1,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,0,0,0,1,0,0,0,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  const gameStateRef = useRef({
    map: JSON.parse(JSON.stringify(initialMap)),
    pacman: { x: 1, y: 1, dx: 0, dy: 0, nextDx: 0, nextDy: 0 },
    ghosts: [
      { x: 7, y: 6, dx: 1, dy: 0, color: '#EF4444' },
      { x: 7, y: 5, dx: -1, dy: 0, color: '#EC4899' }
    ],
    score: 0,
    mouth: 0.2,
    mouthDir: 0.03,
    frame: 0
  });

  const setDirection = (dx: number, dy: number) => {
    gameStateRef.current.pacman.nextDx = dx;
    gameStateRef.current.pacman.nextDy = dy;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const tileSize = 24;
    const gridCols = 15;
    const gridRows = 15;

    const canMoveTo = (x: number, y: number) => {
      if (x < 0 || x >= gridCols || y < 0 || y >= gridRows) return false;
      return gameStateRef.current.map[y][x] !== 1;
    };

    const updateGame = () => {
      const state = gameStateRef.current;
      const p = state.pacman;

      // Try change direction
      if (p.nextDx !== 0 || p.nextDy !== 0) {
        if (canMoveTo(p.x + p.nextDx, p.y + p.nextDy)) {
          p.dx = p.nextDx;
          p.dy = p.nextDy;
          p.nextDx = 0;
          p.nextDy = 0;
        }
      }

      // Move pacman
      if (canMoveTo(p.x + p.dx, p.y + p.dy)) {
        p.x += p.dx;
        p.y += p.dy;

        // Eat dot
        if (state.map[p.y][p.x] === 0) {
          state.map[p.y][p.x] = 2;
          state.score += 10;
          setScore(state.score);
        }
      }

      // Mouth animation
      state.mouth += state.mouthDir;
      if (state.mouth >= 0.45 || state.mouth <= 0.05) {
        state.mouthDir = -state.mouthDir;
      }

      // Move ghosts
      state.ghosts.forEach(g => {
        const dirs = [
          { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
          { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
        ];
        const valid = dirs.filter(d => canMoveTo(g.x + d.dx, g.y + d.dy));
        if (valid.length > 0) {
          if (canMoveTo(g.x + g.dx, g.y + g.dy) && Math.random() > 0.4) {
            g.x += g.dx;
            g.y += g.dy;
          } else {
            const pick = valid[Math.floor(Math.random() * valid.length)];
            g.dx = pick.dx;
            g.dy = pick.dy;
            g.x += g.dx;
            g.y += g.dy;
          }
        }
      });
    };

    const renderGame = () => {
      const state = gameStateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render maze
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const tile = state.map[r][c];
          const cx = c * tileSize;
          const cy = r * tileSize;

          if (tile === 1) {
            ctx.fillStyle = '#1E3A8A';
            ctx.fillRect(cx, cy, tileSize, tileSize);
            ctx.strokeStyle = '#3B82F6';
            ctx.strokeRect(cx + 2, cy + 2, tileSize - 4, tileSize - 4);
          } else if (tile === 0) {
            ctx.fillStyle = '#F59E0B';
            ctx.beginPath();
            ctx.arc(cx + tileSize / 2, cy + tileSize / 2, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Render Pacman
      const p = state.pacman;
      const px = p.x * tileSize + tileSize / 2;
      const py = p.y * tileSize + tileSize / 2;
      let startAngle = 0;
      if (p.dx === 1) startAngle = 0;
      else if (p.dx === -1) startAngle = Math.PI;
      else if (p.dy === 1) startAngle = Math.PI / 2;
      else if (p.dy === -1) startAngle = (3 * Math.PI) / 2;

      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(
        px, py, tileSize / 2 - 2,
        startAngle + state.mouth,
        startAngle + Math.PI * 2 - state.mouth
      );
      ctx.lineTo(px, py);
      ctx.fill();

      // Render Ghosts
      state.ghosts.forEach(g => {
        const gx = g.x * tileSize + tileSize / 2;
        const gy = g.y * tileSize + tileSize / 2;

        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(gx, gy - 2, tileSize / 2 - 2, Math.PI, 0, false);
        ctx.lineTo(gx + tileSize / 2 - 2, gy + tileSize / 2);
        ctx.lineTo(gx - tileSize / 2 + 2, gy + tileSize / 2);
        ctx.fill();

        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(gx - 4, gy - 4, 3, 0, Math.PI * 2);
        ctx.arc(gx + 4, gy - 4, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1E3A8A';
        ctx.beginPath();
        ctx.arc(gx - 4 + g.dx * 1.5, gy - 4 + g.dy * 1.5, 1.5, 0, Math.PI * 2);
        ctx.arc(gx + 4 + g.dx * 1.5, gy - 4 + g.dy * 1.5, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      gameStateRef.current.frame++;
      if (gameStateRef.current.frame % 10 === 0) {
        updateGame();
      }
      renderGame();
      animId = requestAnimationFrame(loop);
    };

    loop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { setDirection(0, -1); e.preventDefault(); }
      else if (['ArrowDown', 'KeyS'].includes(e.code)) { setDirection(0, 1); e.preventDefault(); }
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) { setDirection(-1, 0); e.preventDefault(); }
      else if (['ArrowRight', 'KeyD'].includes(e.code)) { setDirection(1, 0); e.preventDefault(); }
      else if (e.code === 'Escape') { onClose(); }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md bg-[#090d16] border-2 border-blue-900 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col items-center space-y-4">
        
        {/* Game Header */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-display font-black text-amber-400 text-sm sm:text-base">
            <Gamepad2 className="w-5 h-5" />
            <span>PAC-MAN RETRO ARCADE</span>
          </div>
          <div className="font-mono font-bold text-xs sm:text-sm text-emerald-400">
            SCORE: {String(score).padStart(4, '0')}
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className="rounded-xl border-2 border-blue-500 bg-black shadow-lg"
        />

        {/* Mobile Touch D-Pad */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <button
            onClick={() => setDirection(0, -1)}
            className="w-12 h-12 rounded-xl bg-gray-800 border border-white/20 text-amber-400 font-black text-lg active:bg-blue-600 active:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
          >
            ▲
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => setDirection(-1, 0)}
              className="w-12 h-12 rounded-xl bg-gray-800 border border-white/20 text-amber-400 font-black text-lg active:bg-blue-600 active:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              ◀
            </button>
            <button
              onClick={() => setDirection(0, 1)}
              className="w-12 h-12 rounded-xl bg-gray-800 border border-white/20 text-amber-400 font-black text-lg active:bg-blue-600 active:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              ▼
            </button>
            <button
              onClick={() => setDirection(1, 0)}
              className="w-12 h-12 rounded-xl bg-gray-800 border border-white/20 text-amber-400 font-black text-lg active:bg-blue-600 active:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Discreet Exit Button */}
        <div className="w-full pt-2 border-t border-white/10 flex justify-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold text-xs transition-all cursor-pointer border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

      </div>
    </div>
  );
};
