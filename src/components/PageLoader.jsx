import { useState, useEffect } from 'react';

function PageLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onFinish(), 900);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`page-loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo">Faisal Aman</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
}

export default PageLoader;
