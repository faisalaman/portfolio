import { useTypingEffect } from '../hooks/useTypingEffect';
import { useCounter } from '../hooks/useCounter';
import ConstellationBackground from './ConstellationBackground';
import Icons from './Icons';
import { profile, stats } from '../data/profile';

function Hero() {
  const typedText = useTypingEffect([
    "Solution Architect",
    "Full Stack Developer",
    "Cloud Engineer",
    "Technical Lead",
    ".NET Consultant",
    "AI Specialist",
  ]);

  return (
    <section className="hero blueprint-hero">
      <ConstellationBackground />
      <div className="container">
        <div className="hero-content blueprint-content">
          <div className="hero-text">
            <h1 className="hero-name blueprint-name gradient-text">{profile.name}</h1>
            <h2 className="blueprint-role">
              <span className="typing-text">{typedText}</span>
              <span className="typing-cursor">|</span>
            </h2>
            <p className="hero-description">
              Full Stack Developer with 12+ years of experience in web development
              and enterprise applications using Microsoft .NET technologies.
              Currently serving at the General Civil Aviation Authority (GCAA), UAE.
              Now exploring AI-powered solutions and intelligent automation.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Initialize Contact {Icons.arrow}
              </a>
              <a href="Faisal_Aman_CV_UAE.docx" download className="btn btn-glass">
                {Icons.download} Download CV
              </a>
            </div>
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
