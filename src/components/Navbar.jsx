import { useState, useEffect } from 'react';
import Icons from './Icons';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = ["about", "services", "experience", "skills", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Services", "Experience", "Skills", "Contact"];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">Cloud Solutions Architect</a>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={activeSection === l.toLowerCase() ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="Faisal_Aman_CV_UAE.docx" download className="nav-cv-btn">
              {Icons.download} Resume
            </a>
          </li>
        </ul>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? Icons.close : Icons.menu}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
