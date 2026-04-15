import { motion as Motion, useReducedMotion } from 'framer-motion';

const blobBase = 'absolute rounded-full blur-[80px] opacity-50 mix-blend-screen';

export function AuroraBackground() {
  const reduce = useReducedMotion();
  const transition = reduce
    ? { duration: 0 }
    : { duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden dark:block">
      <Motion.div
        className={`${blobBase} h-[40vw] w-[40vw] bg-[#a78bfa]`}
        style={{ top: '10%', left: '10%' }}
        animate={{ x: ['0vw', '4vw', '-2vw', '0vw'], y: ['0vh', '3vh', '-2vh', '0vh'], scale: [1, 1.08, 0.96, 1] }}
        transition={transition}
      />
      <Motion.div
        className={`${blobBase} h-[45vw] w-[45vw] bg-[#22d3ee]`}
        style={{ top: '5%', right: '5%' }}
        animate={{ x: ['0vw', '-5vw', '3vw', '0vw'], y: ['0vh', '4vh', '-3vh', '0vh'], scale: [1, 0.95, 1.1, 1] }}
        transition={transition}
      />
      <Motion.div
        className={`${blobBase} h-[50vw] w-[50vw] bg-[#f472b6]`}
        style={{ bottom: '0%', left: '30%' }}
        animate={{ x: ['0vw', '3vw', '-4vw', '0vw'], y: ['0vh', '-3vh', '2vh', '0vh'], scale: [1, 1.1, 0.95, 1] }}
        transition={transition}
      />
    </div>
  );
}

export default AuroraBackground;
