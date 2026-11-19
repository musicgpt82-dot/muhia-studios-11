import { useState, useCallback } from 'react';
import CinematicIntro from './components/CinematicIntro';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import HorizontalScroll from './components/HorizontalScroll';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="film-grain">
      <CustomCursor />
      <CinematicIntro onComplete={handleIntroComplete} />
      
      {introComplete && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Services />
            <Portfolio />
            <HorizontalScroll />
            <About />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
