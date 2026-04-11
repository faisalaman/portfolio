import Icons from './Icons';
import { profile } from '../data/profile';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <span className="footer-logo">Faisal Aman</span>
          <p>&copy; 2026 Faisal Aman. All rights reserved.</p>
          <div className="footer-links">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              {Icons.linkedin}
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              {Icons.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
