export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export const viewportOnce = { once: true, amount: 0.2 };

const ease = [0.4, 0, 0.2, 1];

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const popIn = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
};

export const rotateIn = {
  hidden: { opacity: 0, y: 20, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease } },
};

export const flipLeft = {
  hidden: { opacity: 0, rotateY: -90, x: -40 },
  visible: {
    opacity: 1, rotateY: 0, x: 0,
    transition: { duration: 0.8, ease },
  },
};

export const flipRight = {
  hidden: { opacity: 0, rotateY: 90, x: 40 },
  visible: {
    opacity: 1, rotateY: 0, x: 0,
    transition: { duration: 0.8, ease },
  },
};

export const flipUp = {
  hidden: { opacity: 0, rotateX: 60, y: 40 },
  visible: {
    opacity: 1, rotateX: 0, y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease } },
};

// Bouncy spring entrances — overshoot wobble for "playful tech" feel
export const bounceUp = {
  hidden: { opacity: 0, y: 60, scale: 0.6 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 12, mass: 0.9 },
  },
};

export const bounceDown = {
  hidden: { opacity: 0, y: -60, scale: 0.6 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 12, mass: 0.9 },
  },
};

export const bounceRotate = {
  hidden: { opacity: 0, scale: 0.5, rotate: -8 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 11, mass: 0.8 },
  },
};
