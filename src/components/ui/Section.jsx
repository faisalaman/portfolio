import { motion as Motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeUp, viewportOnce } from '../../lib/motion';

export function Section({ id, className, children, container = true }) {
  return (
    <Motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
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
