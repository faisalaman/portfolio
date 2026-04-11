import { FadeIn } from '../hooks/useFadeIn';
import { experience } from '../data/profile';

function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">04.</span> Professional Experience
          </h2>
        </FadeIn>
        <div className="timeline">
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <p className="timeline-company">{exp.company}</p>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  {exp.description && (
                    <p className="timeline-description">{exp.description}</p>
                  )}
                  <div className="timeline-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <ul className="timeline-highlights">
                    {exp.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
