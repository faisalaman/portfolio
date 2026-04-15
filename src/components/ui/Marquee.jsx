export function Marquee({ items, className = '' }) {
  // Duplicate list so the -50% translate creates a seamless loop
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent" />
      <div className="marquee-track flex w-max gap-12 py-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-sm font-semibold uppercase tracking-widest text-text-muted whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
