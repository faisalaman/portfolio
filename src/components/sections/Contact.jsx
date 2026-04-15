import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

export function Contact() {
  return (
    <Section id="contact">
      <div className="rounded-2xl glass p-10 text-center md:p-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Let's build something</h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          Open to consulting, contract, and full-time roles. Drop a line — I'll get back within a day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button as="a" href={`mailto:${profile.email}`}>{profile.email}</Button>
          <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost">LinkedIn</Button>
        </div>
        <p className="mt-6 text-sm text-text-muted">{profile.phone} · {profile.location}</p>
      </div>
    </Section>
  );
}

export default Contact;
