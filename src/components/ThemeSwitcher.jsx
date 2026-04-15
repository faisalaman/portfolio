import { useState, useEffect, useRef } from 'react';
import Icons from './Icons';

const themes = [
  { id: "default", name: "Indigo", color: "#6366f1" },
  { id: "ocean", name: "Ocean", color: "#0ea5e9" },
  { id: "sunset", name: "Sunset", color: "#f97316" },
  { id: "emerald", name: "Emerald", color: "#10b981" },
  { id: "rose", name: "Rose", color: "#ec4899" },
  { id: "light", name: "Light", color: "#f8fafc" },
  { id: "aurora", name: "Aurora", color: "linear-gradient(135deg, #a78bfa, #22d3ee, #f472b6)" },
];

function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "default";
  });
  const panelRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved && saved !== "default") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectTheme = (themeId) => {
    setCurrent(themeId);
    localStorage.setItem("portfolio-theme", themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
    setOpen(false);
  };

  return (
    <div className="theme-switcher" ref={panelRef}>
      <div className={`theme-panel ${open ? "open" : ""}`}>
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-option ${current === t.id ? "active" : ""}`}
            onClick={() => selectTheme(t.id)}
          >
            <span
              className="theme-swatch"
              style={{
                background: t.color,
                borderColor: t.id === "light" ? "#cbd5e1" : "rgba(255,255,255,0.15)",
              }}
            ></span>
            {t.name}
          </button>
        ))}
      </div>
      <button
        className="theme-toggle-btn"
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  );
}

export default ThemeSwitcher;
