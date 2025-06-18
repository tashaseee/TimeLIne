import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowToUse from './components/HowToUse/HowToUse';
import Features from './components/Features/Features';
import Examples from './components/Examples/Examples';
import Footer from './components/Footer/Footer';
import Particles from './components/Particles/Particles';
import Gallery from './components/Gallery/Gallery'; // Adjust path if needed
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'how-to-use', 'features', 'examples'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-transparent relative">
            <Particles />
            <Header activeSection={activeSection} />
            <section id="hero" className="section-animate">
              <Hero />
            </section>
            <section id="how-to-use" className="section-animate">
              <HowToUse />
            </section>
            <section id="features" className="section-animate">
              <Features />
            </section>
            <section id="examples" className="section-animate">
              <Examples />
            </section>
            <Footer activeSection={activeSection} />
          </div>
        } />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;