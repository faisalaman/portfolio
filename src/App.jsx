import { useState, useCallback } from 'react';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TechExpertise from './components/TechExpertise';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatAssistant from './components/AIChatAssistant';
import ThemeSwitcher from './components/ThemeSwitcher';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  if (loading) {
    return <PageLoader onFinish={handleLoaded} />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechExpertise />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop />
      <AIChatAssistant />
      <ThemeSwitcher />
    </>
  );
}
