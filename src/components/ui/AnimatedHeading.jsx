import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export function AnimatedHeading({ as: _Tag = 'h2', className, children }) {
  const Tag = _Tag;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [seen]);

  return (
    <Tag ref={ref} className={cn('heading-underline', seen && 'in-view', className)}>
      {children}
    </Tag>
  );
}

export default AnimatedHeading;
