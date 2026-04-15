import { motion as Motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeUp, viewportOnce } from '../../lib/motion';

export function Section({ id, className, children, container = true }) {
  const reduce = useReducedMotion();
  return (
    <Motion.section
      id={id}
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={viewportOnce}
      className={cn('py-20 md:py-28', className)}
    >
      {container ? (
        <div className="mx-auto max-w-6xl px-4 md:px-8">{children}</div>
      ) : (
        children
      )}
    </Motion.section>
  );
}

export default Section;
