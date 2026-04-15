import { motion as Motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { fadeUp, stagger } from '../../lib/motion';
import { profile } from '../../data/profile';

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-28 pb-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <Motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <Motion.p variants={fadeUp} className="mb-4 text-sm font-medium tracking-widest text-primary uppercase">
            {profile.title}
          </Motion.p>
          <Motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
          >
            Hi, I'm <GradientText>{profile.name}</GradientText>
          </Motion.h1>
          <Motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl"
          >
            {profile.summary}
          </Motion.p>
          <Motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Button as="a" href="#contact">Get in touch</Button>
            <Button as="a" href="#experience" variant="ghost">View experience</Button>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}

export default Hero;
