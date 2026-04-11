import { useTypingEffect } from '../hooks/useTypingEffect';
import { useCounter } from '../hooks/useCounter';
import ConstellationBackground from './ConstellationBackground';
import Icons from './Icons';
import { profile, stats } from '../data/profile';

function Hero() {
  const typedText = useTypingEffect(profile.typingRoles);

  return (
    <section className="hero">
      <ConstellationBackground />
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Available for opportunities
            </div>
            <h1 className="hero-name">
              <span className="hero-greeting">Hi, I'm</span>
              {profile.name}
            </h1>
            <h2 className="hero-title">
              <span className="typing-text">{typedText}</span>
              <span className="typing-cursor">|</span>
            </h2>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Get In Touch {Icons.arrow}
              </a>
              <a href="Faisal_Aman_CV_UAE.docx" download className="btn btn-glass">
                {Icons.download} Download CV
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-avatar">
              <svg className="hero-avatar-icon" width="80" height="80" viewBox="0 0 80 80" fill="none">
                {/* Brain / AI icon */}
                <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                {/* Left hemisphere */}
                <path d="M40 12C28 12 20 22 20 32c0 6 3 10 5 13 2 3 3 6 3 9v6h12v-6c0-4 2-7 4-10 3-4 6-9 6-16 0-5-4-16-10-16z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                {/* Right hemisphere */}
                <path d="M40 12c12 0 20 10 20 20 0 6-3 10-5 13-2 3-3 6-3 9v6H40v-6c0-4-2-7-4-10-3-4-6-9-6-16 0-5 4-16 10-16z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                {/* Neural connections */}
                <circle cx="30" cy="28" r="2.5" fill="rgba(129,140,248,0.9)"/>
                <circle cx="50" cy="28" r="2.5" fill="rgba(34,211,238,0.9)"/>
                <circle cx="35" cy="38" r="2" fill="rgba(129,140,248,0.7)"/>
                <circle cx="45" cy="38" r="2" fill="rgba(34,211,238,0.7)"/>
                <circle cx="40" cy="22" r="2" fill="rgba(255,255,255,0.8)"/>
                <circle cx="40" cy="32" r="3" fill="rgba(255,255,255,0.9)"/>
                <circle cx="33" cy="46" r="1.5" fill="rgba(129,140,248,0.6)"/>
                <circle cx="47" cy="46" r="1.5" fill="rgba(34,211,238,0.6)"/>
                {/* Synaptic lines */}
                <line x1="30" y1="28" x2="40" y2="32" stroke="rgba(129,140,248,0.4)" strokeWidth="1"/>
                <line x1="50" y1="28" x2="40" y2="32" stroke="rgba(34,211,238,0.4)" strokeWidth="1"/>
                <line x1="40" y1="22" x2="40" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                <line x1="35" y1="38" x2="40" y2="32" stroke="rgba(129,140,248,0.3)" strokeWidth="1"/>
                <line x1="45" y1="38" x2="40" y2="32" stroke="rgba(34,211,238,0.3)" strokeWidth="1"/>
                <line x1="30" y1="28" x2="35" y2="38" stroke="rgba(129,140,248,0.2)" strokeWidth="0.8"/>
                <line x1="50" y1="28" x2="45" y2="38" stroke="rgba(34,211,238,0.2)" strokeWidth="0.8"/>
                <line x1="35" y1="38" x2="33" y2="46" stroke="rgba(129,140,248,0.2)" strokeWidth="0.8"/>
                <line x1="45" y1="38" x2="47" y2="46" stroke="rgba(34,211,238,0.2)" strokeWidth="0.8"/>
                {/* Circuit board lines at bottom */}
                <path d="M28 60h24" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                <path d="M32 64h16" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                <path d="M36 68h8" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <circle cx="28" cy="60" r="1.5" fill="rgba(129,140,248,0.5)"/>
                <circle cx="52" cy="60" r="1.5" fill="rgba(34,211,238,0.5)"/>
                <circle cx="40" cy="68" r="1.5" fill="rgba(255,255,255,0.4)"/>
              </svg>
            </div>
            <div className="hero-orbit hero-orbit-1"></div>
            <div className="hero-orbit hero-orbit-2"></div>
            <div className="hero-orbit hero-orbit-3"></div>
          </div>
        </div>
        {/* Animated Stats Counter */}
        <div className="hero-stats">
          {stats.map((stat, i) => {
            const [count, ref] = useCounter(stat.number);
            return (
              <div className="hero-stat" key={i} ref={ref}>
                <span className="hero-stat-number">
                  {count}{stat.suffix}
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
