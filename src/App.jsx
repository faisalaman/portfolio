import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Capabilities } from './components/sections/Capabilities';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { TechExpertise } from './components/sections/TechExpertise';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { PageLoader } from './components/widgets/PageLoader';
import { ScrollToTop } from './components/widgets/ScrollToTop';
import { AIChatAssistant } from './components/widgets/AIChatAssistant';
import { BlogIndex } from './components/pages/BlogIndex';
import { BlogPost } from './components/pages/BlogPost';
import { useHashRoute } from './hooks/useHashRoute';

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Services />
      <TechExpertise />
      <Experience />
      <Skills />
      <Blog />
      <Contact />
    </main>
  );
}

function routeFor(hash) {
  // Hash-based route. Examples:
  //   ""              → home
  //   "about"         → home (scroll anchor — handled by browser)
  //   "/blog"         → blog index
  //   "/blog/slug"    → blog post
  if (hash.startsWith('/blog/')) {
    return { kind: 'post', slug: hash.replace('/blog/', '') };
  }
  if (hash === '/blog') {
    return { kind: 'blog-index' };
  }
  return { kind: 'home' };
}

export default function App() {
  const hash = useHashRoute();
  const route = routeFor(hash);

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <AuroraBackground />
      <Navbar />
      {route.kind === 'home' && <HomePage />}
      {route.kind === 'blog-index' && <BlogIndex />}
      {route.kind === 'post' && <BlogPost slug={route.slug} />}
      <Footer />
      <ScrollToTop />
      <AIChatAssistant />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
