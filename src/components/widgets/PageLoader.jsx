import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <Motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
        >
          <Motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-12 w-12"
          >
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-primary" />
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
