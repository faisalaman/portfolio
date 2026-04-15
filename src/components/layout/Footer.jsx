import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10 text-sm text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 md:flex-row md:justify-between md:px-8">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-text">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-text">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
