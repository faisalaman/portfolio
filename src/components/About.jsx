import { FadeIn } from '../hooks/useFadeIn';
import Icons from './Icons';
import { profile } from '../data/profile';

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">01.</span> About Me
          </h2>
        </FadeIn>
        <div className="about-grid">
          <FadeIn className="about-text" delay={100}>
            <p>
              I'm a Senior .NET Consultant and Full Stack Developer currently serving at the{" "}
              <strong>General Civil Aviation Authority (GCAA)</strong> in the UAE.
              With over 12 years of hands-on experience, I specialize in building enterprise-grade
              applications using Microsoft .NET technologies.
            </p>
            <p>
              My journey has taken me through diverse industries — from aviation safety
              and government systems to fintech, real estate, and healthcare. I thrive
              in multi-cultural environments and enjoy mentoring teams while delivering
              scalable, high-quality solutions.
            </p>
          </FadeIn>
          <div className="about-cards">
            <FadeIn delay={200}>
              <div className="info-card">
                <div className="info-card-icon">{Icons.location}</div>
                <div>
                  <span className="info-card-label">Location</span>
                  <span className="info-card-value">{profile.location}</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="info-card">
                <div className="info-card-icon">{Icons.certificate}</div>
                <div>
                  <span className="info-card-label">Certifications</span>
                  {profile.certifications.map((cert, i) => (
                    <span className="info-card-value" key={i} style={{ display: "block" }}>{cert.name} — {cert.description}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="info-card">
                <div className="info-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <span className="info-card-label">Education</span>
                  <span className="info-card-value">
                    {profile.education.degree} — {profile.education.school}
                  </span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="info-card">
                <div className="info-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <span className="info-card-label">Languages</span>
                  <span className="info-card-value">{profile.languages}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
