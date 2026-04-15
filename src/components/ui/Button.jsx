import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

const variants = {
  primary:
    'bg-primary text-white hover:shadow-[0_8px_32px_var(--color-primary)] dark:hover:shadow-[0_8px_32px_rgba(167,139,250,0.4)]',
  ghost:
    'border border-border bg-transparent text-text hover:bg-surface',
};

export function Button({ as = 'button', variant = 'primary', className, children, ...props }) {
  const Comp = motion[as] ?? motion.button;
  return (
    <Comp
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Button;
