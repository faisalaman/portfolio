import { FadeIn } from '../hooks/useFadeIn';
import { skills } from '../data/profile';

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">05.</span> Core Skills
          </h2>
        </FadeIn>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 50}>
              <div className="skill-bar-card">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{skill.name}</span>
                  <span className="skill-bar-level">{skill.level * 20}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level * 20}%` }}
                  ></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
