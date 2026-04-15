import { FadeIn } from '../hooks/useFadeIn';
import useTilt from '../hooks/useTilt';
import Icons from './Icons';
import { services } from '../data/profile';

function ServiceCard({ service }) {
  const ref = useTilt();
  return (
    <div ref={ref} className="service-card">
      <div className="service-icon">{Icons[service.icon]}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
    </div>
  );
}

function Services() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <FadeIn>
          <h2 className="section-title">
            <span className="section-number">02.</span> What I Do
          </h2>
        </FadeIn>
        <div className="services-grid">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 80}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
