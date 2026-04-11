import { useRef, useEffect } from 'react';

function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let dpr = window.devicePixelRatio || 1;
    let traces = [];
    let nodes = [];
    let pulses = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initGrid();
    };

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    // ── Grid nodes at intersections ──
    const initGrid = () => {
      nodes = [];
      traces = [];
      const spacing = 60;
      const cols = Math.ceil(W() / spacing) + 1;
      const rows = Math.ceil(H() / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.35) continue; // sparse nodes
          nodes.push({
            x: c * spacing,
            y: r * spacing,
            col: c,
            row: r,
            radius: 1.5 + Math.random() * 1.5,
            pulse: Math.random() * Math.PI * 2,
            active: false,
            activeTimer: 0,
          });
        }
      }

      // ── Build circuit traces between nearby nodes ──
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dc = Math.abs(a.col - b.col);
          const dr = Math.abs(a.row - b.row);
          // Only connect adjacent or L-shaped (1 col + some rows or vice versa)
          if ((dc === 0 && dr <= 3) || (dr === 0 && dc <= 3) || (dc === 1 && dr <= 2) || (dr === 1 && dc <= 2)) {
            if (Math.random() > 0.25) continue; // keep it sparse
            // Build right-angle path
            const path = buildCircuitPath(a.x, a.y, b.x, b.y);
            traces.push({
              path,
              drawProgress: 0,
              drawn: false,
              speed: 0.003 + Math.random() * 0.004,
              opacity: 0.06 + Math.random() * 0.06,
              fromNode: i,
              toNode: j,
            });
          }
        }
      }
    };

    // Build L-shaped or straight circuit path between two points
    const buildCircuitPath = (x1, y1, x2, y2) => {
      const points = [{ x: x1, y: y1 }];
      if (Math.random() > 0.5) {
        // Go horizontal first, then vertical
        points.push({ x: x2, y: y1 });
        points.push({ x: x2, y: y2 });
      } else {
        // Go vertical first, then horizontal
        points.push({ x: x1, y: y2 });
        points.push({ x: x2, y: y2 });
      }
      return points;
    };

    // Create a signal pulse along a trace
    const createPulse = () => {
      const eligibleTraces = traces.filter(t => t.drawn);
      if (eligibleTraces.length === 0) return;
      const trace = eligibleTraces[Math.floor(Math.random() * eligibleTraces.length)];
      const reverse = Math.random() > 0.5;
      pulses.push({
        trace,
        progress: 0,
        speed: 0.01 + Math.random() * 0.015,
        reverse,
        color: Math.random() > 0.5 ? [99, 102, 241] : [34, 211, 238],
        size: 2 + Math.random() * 2,
      });
      // Activate endpoint nodes
      nodes[trace.fromNode].active = true;
      nodes[trace.fromNode].activeTimer = 50;
      nodes[trace.toNode].active = true;
      nodes[trace.toNode].activeTimer = 50;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    let pulseTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W(), H());
      time += 0.005;
      pulseTimer++;

      // ── Draw engineering grid ──
      const spacing = 60;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.025)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W(); x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }
      for (let y = 0; y < H(); y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }

      // ── Minor grid (finer) ──
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.012)';
      const minorSpacing = 15;
      for (let x = 0; x < W(); x += minorSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }
      for (let y = 0; y < H(); y += minorSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }

      // ── Draw corner targeting brackets ──
      const bracketSize = 40;
      const bracketInset = 30;
      const bracketOpacity = 0.15 + Math.sin(time * 2) * 0.05;
      ctx.strokeStyle = `rgba(99, 102, 241, ${bracketOpacity})`;
      ctx.lineWidth = 1.5;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(bracketInset, bracketInset + bracketSize);
      ctx.lineTo(bracketInset, bracketInset);
      ctx.lineTo(bracketInset + bracketSize, bracketInset);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(W() - bracketInset - bracketSize, bracketInset);
      ctx.lineTo(W() - bracketInset, bracketInset);
      ctx.lineTo(W() - bracketInset, bracketInset + bracketSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(bracketInset, H() - bracketInset - bracketSize);
      ctx.lineTo(bracketInset, H() - bracketInset);
      ctx.lineTo(bracketInset + bracketSize, H() - bracketInset);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(W() - bracketInset - bracketSize, H() - bracketInset);
      ctx.lineTo(W() - bracketInset, H() - bracketInset);
      ctx.lineTo(W() - bracketInset, H() - bracketInset - bracketSize);
      ctx.stroke();

      // ── Animated circuit traces (draw themselves) ──
      traces.forEach((trace) => {
        if (!trace.drawn) {
          trace.drawProgress += trace.speed;
          if (trace.drawProgress >= 1) {
            trace.drawProgress = 1;
            trace.drawn = true;
          }
        }

        const path = trace.path;
        const progress = trace.drawProgress;

        // Calculate total path length
        let totalLen = 0;
        const segLens = [];
        for (let i = 0; i < path.length - 1; i++) {
          const dx = path[i + 1].x - path[i].x;
          const dy = path[i + 1].y - path[i].y;
          const len = Math.sqrt(dx * dx + dy * dy);
          segLens.push(len);
          totalLen += len;
        }

        const drawLen = totalLen * progress;
        let drawn = 0;

        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);

        for (let i = 0; i < segLens.length; i++) {
          if (drawn + segLens[i] <= drawLen) {
            ctx.lineTo(path[i + 1].x, path[i + 1].y);
            drawn += segLens[i];
          } else {
            const remaining = drawLen - drawn;
            const t = remaining / segLens[i];
            const x = path[i].x + (path[i + 1].x - path[i].x) * t;
            const y = path[i].y + (path[i + 1].y - path[i].y) * t;
            ctx.lineTo(x, y);
            break;
          }
        }

        // Mouse proximity boost
        const midX = (path[0].x + path[path.length - 1].x) / 2;
        const midY = (path[0].y + path[path.length - 1].y) / 2;
        const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
        const mouseBoost = mouseDist < 200 ? 0.08 * (1 - mouseDist / 200) : 0;

        ctx.strokeStyle = `rgba(99, 102, 241, ${trace.opacity + mouseBoost})`;
        ctx.lineWidth = mouseBoost > 0 ? 1 : 0.8;
        ctx.stroke();

        // Draw small squares at corners of the path
        if (trace.drawn) {
          path.forEach((p, idx) => {
            if (idx === 0 || idx === path.length - 1) return;
            const s = 2;
            ctx.fillStyle = `rgba(99, 102, 241, ${trace.opacity * 1.5})`;
            ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
          });
        }
      });

      // ── Spawn signal pulses ──
      if (pulseTimer % 40 === 0) {
        createPulse();
      }

      // ── Draw signal pulses ──
      pulses = pulses.filter((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) return false;

        const path = pulse.trace.path;
        const p = pulse.reverse ? 1 - pulse.progress : pulse.progress;

        // Find position along path
        let totalLen = 0;
        const segLens = [];
        for (let i = 0; i < path.length - 1; i++) {
          const dx = path[i + 1].x - path[i].x;
          const dy = path[i + 1].y - path[i].y;
          segLens.push(Math.sqrt(dx * dx + dy * dy));
          totalLen += segLens[i];
        }

        const targetLen = totalLen * p;
        let walked = 0;
        let px = path[0].x, py = path[0].y;

        for (let i = 0; i < segLens.length; i++) {
          if (walked + segLens[i] >= targetLen) {
            const t = (targetLen - walked) / segLens[i];
            px = path[i].x + (path[i + 1].x - path[i].x) * t;
            py = path[i].y + (path[i + 1].y - path[i].y) * t;
            break;
          }
          walked += segLens[i];
        }

        // Glow
        const c = pulse.color;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 6);
        glow.addColorStop(0, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.35)`);
        glow.addColorStop(0.4, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.1)`);
        glow.addColorStop(1, `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(px - pulse.size * 6, py - pulse.size * 6, pulse.size * 12, pulse.size * 12);

        // Bright center
        ctx.beginPath();
        ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.8)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, pulse.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        return true;
      });

      // ── Draw nodes ──
      nodes.forEach((node) => {
        node.pulse += 0.015;
        if (node.activeTimer > 0) node.activeTimer--;
        if (node.activeTimer === 0) node.active = false;

        // Mouse proximity
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          node.active = true;
          node.activeTimer = Math.max(node.activeTimer, 15);
        }

        const isActive = node.active;
        const r = node.radius + Math.sin(node.pulse) * 0.5;

        if (isActive) {
          // Active glow
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 10);
          glow.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
          glow.addColorStop(1, 'rgba(99, 102, 241, 0)');
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - r * 10, node.y - r * 10, r * 20, r * 20);

          // Active ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Node diamond shape
        const s = r * 1.2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - s);
        ctx.lineTo(node.x + s, node.y);
        ctx.lineTo(node.x, node.y + s);
        ctx.lineTo(node.x - s, node.y);
        ctx.closePath();
        ctx.fillStyle = isActive
          ? 'rgba(129, 140, 248, 0.7)'
          : `rgba(99, 102, 241, ${0.15 + Math.sin(node.pulse) * 0.08})`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });

      // ── Mouse crosshair ──
      if (mouse.x > 0 && mouse.y > 0) {
        const crossSize = 20;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 0.8;

        // Horizontal
        ctx.beginPath();
        ctx.moveTo(mouse.x - crossSize, mouse.y);
        ctx.lineTo(mouse.x - 6, mouse.y);
        ctx.moveTo(mouse.x + 6, mouse.y);
        ctx.lineTo(mouse.x + crossSize, mouse.y);
        ctx.stroke();

        // Vertical
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y - crossSize);
        ctx.lineTo(mouse.x, mouse.y - 6);
        ctx.moveTo(mouse.x, mouse.y + 6);
        ctx.lineTo(mouse.x, mouse.y + crossSize);
        ctx.stroke();

        // Mouse glow
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        mg.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        mg.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default ConstellationBackground;
