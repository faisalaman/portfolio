import { FadeIn } from '../hooks/useFadeIn';
import useTilt from '../hooks/useTilt';
import { experience } from '../data/profile';

function ExperienceCard({ item }) {
  const ref = useTilt();
  return (
    <div ref={ref} className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-header">
          <div>
            <h3 className="timeline-role">{item.role}</h3>
            <p className="timeline-company">{item.company}</p>
          </div>
          <span className="timeline-period">{item.period}</span>
        </div>
        {item.description && (
          <p className="timeline-description">{item.description}</p>
        )}
        <div className="timeline-tags">
          {item.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <ul className="timeline-highlights">
          {item.highlights.map((h, j) => (
            <li key={j}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
              <ExperienceCard item={exp} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
