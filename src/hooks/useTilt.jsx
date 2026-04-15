import { useEffect, useRef } from 'react';

export function useTilt({ max = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (reduce || isTouch) return;

    let frame = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = '';
    };

    el.style.transition = 'transform 0.2s var(--ease, ease)';
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}

export default useTilt;
