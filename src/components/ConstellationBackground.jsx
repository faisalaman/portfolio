import { useRef, useEffect } from 'react';

function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let points = [];
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initPoints();
    };

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    const initPoints = () => {
      points = [];
      const count = Math.floor((W() * H()) / 18000);
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * W(),
          y: Math.random() * H(),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 1.2 + Math.random() * 1.2,
          opacity: 0.15 + Math.random() * 0.25,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    window.addEventListener("resize", resize);

    const connectDist = 160;
    const mouseDist = 200;

    const animate = () => {
      ctx.clearRect(0, 0, W(), H());

      // Update points
      points.forEach((p) => {
        p.pulse += 0.008;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges smoothly
        if (p.x < -10) p.x = W() + 10;
        if (p.x > W() + 10) p.x = -10;
        if (p.y < -10) p.y = H() + 10;
        if (p.y > H() + 10) p.y = -10;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      });

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const opacity = 0.08 * (1 - dist / connectDist);

            // Check if mouse is near the midpoint for highlight
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const mouseMid = Math.sqrt((mouse.x - mx) ** 2 + (mouse.y - my) ** 2);
            const highlight = mouseMid < 150 ? 0.12 * (1 - mouseMid / 150) : 0;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = highlight > 0
              ? `rgba(129, 140, 248, ${opacity + highlight})`
              : `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = highlight > 0 ? 0.8 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw points
      points.forEach((p) => {
        const glow = 0.5 + Math.sin(p.pulse) * 0.3;
        const r = p.radius * (0.9 + Math.sin(p.pulse) * 0.1);

        // Check mouse proximity
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < mouseDist;

        // Soft glow
        const glowR = isNear ? r * 6 : r * 4;
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        const glowOpacity = isNear ? 0.15 : 0.06;
        glowGrad.addColorStop(0, `rgba(99, 102, 241, ${glowOpacity * glow})`);
        glowGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Point
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        const pointOpacity = isNear ? 0.7 : p.opacity * glow;
        ctx.fillStyle = isNear
          ? `rgba(165, 180, 252, ${pointOpacity})`
          : `rgba(99, 102, 241, ${pointOpacity})`;
        ctx.fill();
      });

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        mg.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        mg.addColorStop(0.5, 'rgba(99, 102, 241, 0.015)');
        mg.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
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
