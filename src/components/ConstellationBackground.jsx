import { useRef, useEffect } from 'react';

function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let dpr = window.devicePixelRatio || 1;
    let traces = [];
    let pulses = [];
    let specLabels = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      init();
    };

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    // ── Snap to precision grid ──
    const GRID = 32;
    const snap = (v) => Math.round(v / GRID) * GRID;

    const init = () => {
      traces = [];
      pulses = [];
      specLabels = [];
      const w = W(), h = H();
      const cols = Math.floor(w / GRID);
      const rows = Math.floor(h / GRID);

      // ── Generate circuit traces ──
      const traceCount = Math.floor((w * h) / 20000);
      for (let i = 0; i < traceCount; i++) {
        const sx = snap(GRID * 2 + Math.random() * (w - GRID * 4));
        const sy = snap(GRID * 2 + Math.random() * (h - GRID * 4));
        const path = [{ x: sx, y: sy }];
        let cx = sx, cy = sy;
        let dir = Math.random() > 0.45 ? 'v' : 'h'; // bias vertical

        const segs = 2 + Math.floor(Math.random() * 5);
        for (let s = 0; s < segs; s++) {
          const steps = 2 + Math.floor(Math.random() * 7);
          let nx, ny;
          if (dir === 'v') {
            nx = cx;
            ny = snap(cy + (Math.random() > 0.5 ? 1 : -1) * steps * GRID);
          } else {
            nx = snap(cx + (Math.random() > 0.5 ? 1 : -1) * steps * GRID);
            ny = cy;
          }
          nx = Math.max(GRID, Math.min(w - GRID, nx));
          ny = Math.max(GRID, Math.min(h - GRID, ny));
          if (nx !== cx || ny !== cy) {
            path.push({ x: nx, y: ny });
            cx = nx; cy = ny;
          }
          dir = dir === 'v' ? 'h' : 'v';
        }

        if (path.length >= 2) {
          // Whether this trace has a "T" or branch stub
          const hasStub = Math.random() > 0.6;
          let stub = null;
          if (hasStub && path.length >= 2) {
            const si = 1 + Math.floor(Math.random() * (path.length - 1));
            const sp = path[Math.min(si, path.length - 1)];
            const stubDir = Math.random() > 0.5 ? 'h' : 'v';
            const stubLen = (1 + Math.floor(Math.random() * 3)) * GRID;
            stub = {
              x1: sp.x,
              y1: sp.y,
              x2: stubDir === 'h' ? sp.x + (Math.random() > 0.5 ? stubLen : -stubLen) : sp.x,
              y2: stubDir === 'v' ? sp.y + (Math.random() > 0.5 ? stubLen : -stubLen) : sp.y,
            };
          }

          traces.push({
            path,
            stub,
            progress: 0,
            speed: 0.0015 + Math.random() * 0.003,
            done: false,
            opacity: 0.1 + Math.random() * 0.15,
            lineWidth: Math.random() > 0.7 ? 1.2 : 0.8,
            // Terminal type at endpoints
            startTerminal: ['dot', 'square', 'none'][Math.floor(Math.random() * 3)],
            endTerminal: ['dot', 'square', 'arrow'][Math.floor(Math.random() * 3)],
          });
        }
      }

      // ── Spec labels (monospace text scattered on grid) ──
      const labels = [
        'SYS.ARCH v12.0', 'NET.CORE', 'AZURE.CLOUD', 'API.GATEWAY',
        'SQL.ENGINE', 'CI/CD.PIPE', 'AUTH.MODULE', 'CACHE.LAYER',
        'MICRO.SVC', 'LOAD.BAL', 'MSG.QUEUE', 'DEPLOY.NODE',
        'ENTITY.FW', 'ANGULAR.UI', 'REST.API', 'BLOB.STORE',
      ];
      const labelCount = Math.floor(w / 200);
      for (let i = 0; i < labelCount; i++) {
        specLabels.push({
          text: labels[Math.floor(Math.random() * labels.length)],
          x: snap(GRID * 3 + Math.random() * (w - GRID * 6)),
          y: snap(GRID * 3 + Math.random() * (h - GRID * 6)),
          opacity: 0,
          maxOpacity: 0.06 + Math.random() * 0.06,
          delay: Math.random() * 300,
          fadeIn: 0,
        });
      }
    };

    // ── Path helpers ──
    const getPathLength = (path) => {
      let len = 0;
      for (let i = 0; i < path.length - 1; i++) {
        len += Math.abs(path[i + 1].x - path[i].x) + Math.abs(path[i + 1].y - path[i].y);
      }
      return len;
    };

    const getPosAt = (path, progress) => {
      const total = getPathLength(path);
      const target = total * progress;
      let walked = 0;
      for (let i = 0; i < path.length - 1; i++) {
        const dx = path[i + 1].x - path[i].x;
        const dy = path[i + 1].y - path[i].y;
        const segLen = Math.abs(dx) + Math.abs(dy);
        if (walked + segLen >= target) {
          const t = (target - walked) / segLen;
          return { x: path[i].x + dx * t, y: path[i].y + dy * t };
        }
        walked += segLen;
      }
      return { x: path[path.length - 1].x, y: path[path.length - 1].y };
    };

    const drawTerminal = (x, y, type, opacity) => {
      const o = Math.min(opacity * 3, 1);
      if (type === 'dot') {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 160, 240, ${o * 0.8})`;
        ctx.fill();
        // glow ring
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80, 160, 240, ${o * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else if (type === 'square') {
        const s = 3;
        ctx.fillStyle = `rgba(80, 160, 240, ${o * 0.7})`;
        ctx.fillRect(x - s, y - s, s * 2, s * 2);
        ctx.strokeStyle = `rgba(80, 160, 240, ${o * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x - s - 2, y - s - 2, (s + 2) * 2, (s + 2) * 2);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W(), H());
      time += 0.004;
      frame++;

      const w = W(), h = H();

      // ══════ PRECISION GRID ══════
      // Major grid
      ctx.strokeStyle = 'rgba(60, 100, 160, 0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      // Minor grid crosshairs at intersections
      for (let x = 0; x <= w; x += GRID) {
        for (let y = 0; y <= h; y += GRID) {
          ctx.fillStyle = 'rgba(60, 110, 180, 0.04)';
          ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
        }
      }

      // ══════ CORNER TARGETING BRACKETS ══════
      const bs = 50, bi = 16;
      const bo = 0.2 + Math.sin(time * 1.5) * 0.06;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(60, 130, 220, ${bo})`;
      // TL
      ctx.beginPath(); ctx.moveTo(bi, bi + bs); ctx.lineTo(bi, bi); ctx.lineTo(bi + bs, bi); ctx.stroke();
      // TR
      ctx.beginPath(); ctx.moveTo(w-bi-bs, bi); ctx.lineTo(w-bi, bi); ctx.lineTo(w-bi, bi+bs); ctx.stroke();
      // BL
      ctx.beginPath(); ctx.moveTo(bi, h-bi-bs); ctx.lineTo(bi, h-bi); ctx.lineTo(bi+bs, h-bi); ctx.stroke();
      // BR
      ctx.beginPath(); ctx.moveTo(w-bi-bs, h-bi); ctx.lineTo(w-bi, h-bi); ctx.lineTo(w-bi, h-bi-bs); ctx.stroke();

      // Small tick marks along bracket edges
      ctx.strokeStyle = `rgba(60, 130, 220, ${bo * 0.4})`;
      ctx.lineWidth = 0.8;
      for (let t = 0; t < 4; t++) {
        const tx = bi + bs + 12 + t * 10;
        ctx.beginPath(); ctx.moveTo(tx, bi); ctx.lineTo(tx, bi + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bi, bi + bs + 12 + t * 10); ctx.lineTo(bi + 5, bi + bs + 12 + t * 10); ctx.stroke();
      }

      // ══════ CIRCUIT TRACES (self-drawing) ══════
      traces.forEach((trace) => {
        if (!trace.done) {
          trace.progress += trace.speed;
          if (trace.progress >= 1) {
            trace.progress = 1;
            trace.done = true;
          }
        }

        const path = trace.path;
        const totalLen = getPathLength(path);
        const drawLen = totalLen * trace.progress;
        let walked = 0;

        // Draw path
        ctx.strokeStyle = `rgba(50, 130, 210, ${trace.opacity})`;
        ctx.lineWidth = trace.lineWidth;

        for (let i = 0; i < path.length - 1; i++) {
          const dx = path[i + 1].x - path[i].x;
          const dy = path[i + 1].y - path[i].y;
          const segLen = Math.abs(dx) + Math.abs(dy);

          if (walked >= drawLen) break;

          ctx.beginPath();
          ctx.moveTo(path[i].x, path[i].y);

          if (walked + segLen <= drawLen) {
            ctx.lineTo(path[i + 1].x, path[i + 1].y);
          } else {
            const t = (drawLen - walked) / segLen;
            ctx.lineTo(path[i].x + dx * t, path[i].y + dy * t);
          }
          ctx.stroke();
          walked += segLen;
        }

        // Draw stub/branch
        if (trace.stub && trace.done) {
          ctx.beginPath();
          ctx.moveTo(trace.stub.x1, trace.stub.y1);
          ctx.lineTo(trace.stub.x2, trace.stub.y2);
          ctx.strokeStyle = `rgba(50, 130, 210, ${trace.opacity * 0.6})`;
          ctx.lineWidth = trace.lineWidth * 0.7;
          ctx.stroke();
          drawTerminal(trace.stub.x2, trace.stub.y2, 'dot', trace.opacity * 0.5);
        }

        // Draw corner dots
        const visiblePts = Math.ceil(path.length * trace.progress);
        for (let i = 0; i < visiblePts && i < path.length; i++) {
          const p = path[i];
          // Corner junction dots
          if (i > 0 && i < path.length - 1) {
            ctx.fillStyle = `rgba(80, 170, 255, ${trace.opacity * 1.8})`;
            ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
          }
        }

        // Terminals
        if (trace.progress > 0.05) {
          drawTerminal(path[0].x, path[0].y, trace.startTerminal, trace.opacity);
        }
        if (trace.done) {
          drawTerminal(path[path.length - 1].x, path[path.length - 1].y, trace.endTerminal, trace.opacity);
        }

        // Drawing head glow (while animating)
        if (!trace.done) {
          const headPos = getPosAt(path, trace.progress);
          const glow = ctx.createRadialGradient(headPos.x, headPos.y, 0, headPos.x, headPos.y, 12);
          glow.addColorStop(0, 'rgba(100, 200, 255, 0.4)');
          glow.addColorStop(1, 'rgba(100, 200, 255, 0)');
          ctx.fillStyle = glow;
          ctx.fillRect(headPos.x - 12, headPos.y - 12, 24, 24);
        }
      });

      // ══════ SIGNAL PULSES ══════
      if (frame % 60 === 0 && traces.filter(t => t.done).length > 0) {
        const eligible = traces.filter(t => t.done);
        const trace = eligible[Math.floor(Math.random() * eligible.length)];
        pulses.push({
          path: trace.path,
          progress: 0,
          speed: 0.004 + Math.random() * 0.008,
          reverse: Math.random() > 0.5,
        });
      }

      pulses = pulses.filter((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        const p = pulse.reverse ? 1 - pulse.progress : pulse.progress;
        const pos = getPosAt(pulse.path, p);

        // Glow trail
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 18);
        glow.addColorStop(0, 'rgba(100, 200, 255, 0.6)');
        glow.addColorStop(0.3, 'rgba(60, 150, 240, 0.15)');
        glow.addColorStop(1, 'rgba(40, 120, 220, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(pos.x - 18, pos.y - 18, 36, 36);

        // Core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 235, 255, 0.95)';
        ctx.fill();

        return true;
      });

      // ══════ SPEC LABELS (monospace) ══════
      ctx.font = "9px 'SF Mono', 'Fira Code', 'Courier New', monospace";
      specLabels.forEach((label) => {
        if (frame > label.delay) {
          label.fadeIn = Math.min(label.fadeIn + 0.005, 1);
          label.opacity = label.maxOpacity * label.fadeIn;
        }
        if (label.opacity > 0.01) {
          ctx.fillStyle = `rgba(80, 140, 200, ${label.opacity})`;
          ctx.fillText(label.text, label.x, label.y);

          // Small line connecting label to grid
          ctx.strokeStyle = `rgba(80, 140, 200, ${label.opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(label.x - 2, label.y - 4);
          ctx.lineTo(label.x - 8, label.y - 4);
          ctx.lineTo(label.x - 8, label.y - 10);
          ctx.stroke();
        }
      });

      // ══════ COORDINATE READOUT (bottom-right) ══════
      const readout = `[${Math.floor(w)}x${Math.floor(h)}] GRID:${GRID}px`;
      ctx.font = "9px 'SF Mono', 'Fira Code', 'Courier New', monospace";
      ctx.fillStyle = `rgba(60, 120, 180, 0.1)`;
      ctx.fillText(readout, w - 180, h - 20);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default ConstellationBackground;
