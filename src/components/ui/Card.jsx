import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/cn';

export function Card({ children, className, tilt = false, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const tiltActive = tilt && !reduce;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    ref.current.style.setProperty('--mx', `${px}px`);
    ref.current.style.setProperty('--my', `${py}px`);
    if (!tiltActive) return;
    x.set(px / rect.width - 0.5);
    y.set(py / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tiltActive ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 320, damping: 14, mass: 0.6 }}
      className={cn(
        'spotlight glass rounded-2xl p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)]',
        className
      )}
      {...props}
    >
      {children}
    </Motion.div>
  );
}

export default Card;
