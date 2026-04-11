import { FadeIn } from '../hooks/useFadeIn';
import Icons from './Icons';
import { profile } from '../data/profile';

function Contact() {
  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">06.</span> Get In Touch
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="contact-content">
            <p className="contact-text">
              I'm always open to discussing new opportunities, interesting projects,
              or collaboration. Whether you need a senior developer, a technical lead,
              or a consultant — let's connect!
            </p>
            <div className="contact-cards">
              <a href={`mailto:${profile.email}`} className="contact-card">
                <div className="contact-card-icon">{Icons.email}</div>
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="contact-card">
                <div className="contact-card-icon">{Icons.phone}</div>
                <span className="contact-card-label">Phone</span>
                <span className="contact-card-value">{profile.phone}</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon">{Icons.linkedin}</div>
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">faisal-aman</span>
              </a>
            </div>
            <a href={`mailto:${profile.email}`} className="btn btn-primary btn-lg">
              Say Hello {Icons.arrow}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Contact;
