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
