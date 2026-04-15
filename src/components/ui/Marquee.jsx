import { cn } from '../../lib/cn';

export function Marquee({ items, reverse = false, speed = 35, className = '' }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div
        className="flex w-max gap-3 py-2 [animation:marquee_var(--m-speed)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{
          '--m-speed': `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-text whitespace-nowrap shadow-sm transition-transform hover:scale-105"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
