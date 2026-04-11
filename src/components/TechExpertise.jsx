import { FadeIn } from '../hooks/useFadeIn';
import { techExpertise } from '../data/profile';

function TechExpertise() {
  return (
    <section className="section" id="tech">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">03.</span> Technical Expertise
          </h2>
        </FadeIn>
        <div className="tech-grid">
          {Object.entries(techExpertise).map(([category, techs], i) => (
            <FadeIn key={category} delay={i * 60}>
              <div className="tech-card">
                <h4 className="tech-card-title">{category}</h4>
                <p className="tech-card-content">{techs}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechExpertise;
