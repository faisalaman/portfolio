import { AuroraBackground } from './components/ui/AuroraBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { TechExpertise } from './components/sections/TechExpertise';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';
import { PageLoader } from './components/widgets/PageLoader';
import { ScrollToTop } from './components/widgets/ScrollToTop';
import { AIChatAssistant } from './components/widgets/AIChatAssistant';

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TechExpertise />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <AIChatAssistant />
    </>
  );
}
