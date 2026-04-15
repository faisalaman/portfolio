import { motion as Motion, useReducedMotion } from 'framer-motion';

// Animated neural-network orb: rotating dashed rings, pulsing nodes,
// connecting lines that travel light pulses. Pure SVG + Framer Motion.
export function AIOrb({ className = '' }) {
  const reduce = useReducedMotion();

  // 8 nodes evenly spaced on a circle
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { id: i, x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 };
  });

  // chord pairs (every node to ones a few steps away)
  const chords = [];
  for (let i = 0; i < nodes.length; i++) {
    for (const offset of [2, 3]) {
      const j = (i + offset) % nodes.length;
      chords.push({ a: nodes[i], b: nodes[j], delay: (i + offset) * 0.25 });
    }
  }

  return (
    <div className={`relative aspect-square w-full max-w-[420px] ${className}`}>
      {/* Outer pulsating glow */}
      <Motion.div
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-4 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-50 blur-2xl"
      />

      <svg viewBox="0 0 100 100" className="relative h-full w-full">
        <defs>
          <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%"  stopColor="var(--color-primary)" />
            <stop offset="50%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-magenta)" />
          </linearGradient>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Rotating dashed rings */}
        <Motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        >
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#ring-grad)" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.7" />
        </Motion.g>
        <Motion.g
          animate={reduce ? undefined : { rotate: -360 }}
          transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        >
          <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ring-grad)" strokeWidth="0.3" strokeDasharray="1 4" opacity="0.6" />
        </Motion.g>
        <Motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        >
          <circle cx="50" cy="50" r="30" fill="none" stroke="url(#ring-grad)" strokeWidth="0.4" strokeDasharray="6 2" opacity="0.5" />
        </Motion.g>

        {/* Connecting chords */}
        {chords.map((c, i) => (
          <line
            key={i}
            x1={c.a.x} y1={c.a.y} x2={c.b.x} y2={c.b.y}
            stroke="url(#ring-grad)" strokeWidth="0.25" opacity="0.35"
          />
        ))}

        {/* Light pulses traveling chords */}
        {!reduce && chords.slice(0, 8).map((c, i) => (
          <Motion.circle
            key={`pulse-${i}`}
            r="0.9"
            fill="var(--color-accent)"
            initial={{ cx: c.a.x, cy: c.a.y, opacity: 0 }}
            animate={{
              cx: [c.a.x, c.b.x],
              cy: [c.a.y, c.b.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: c.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <Motion.g
            key={n.id}
            animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={reduce ? undefined : { duration: 2 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="1.6" fill="var(--color-primary)" />
            <circle cx={n.x} cy={n.y} r="3" fill="var(--color-primary)" opacity="0.25" />
          </Motion.g>
        ))}

        {/* Core glowing center */}
        <Motion.circle
          cx="50" cy="50" r="14"
          fill="url(#core-grad)"
          animate={reduce ? undefined : { r: [14, 16, 14], opacity: [0.7, 1, 0.7] }}
          transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text
          x="50" y="53"
          textAnchor="middle"
          fill="var(--color-text)"
          fontSize="6"
          fontWeight="800"
          letterSpacing="1"
          fontFamily="Inter, sans-serif"
        >
          AI
        </text>
      </svg>
    </div>
  );
}

export default AIOrb;
