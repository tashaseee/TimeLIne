import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [dotVisible, setDotVisible] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Timeline';
  
  useEffect(() => {
    // Blinking dot for subtitle
    const dotInterval = setInterval(() => {
      setDotVisible((prev) => !prev);
    }, 500);

    // Typing animation with human-like variable speed
    let currentIndex = 0;
    const typingSpeeds = [100, 120, 80, 150, 90, 110, 130]; // Variable typing speeds in ms
    
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        const randomSpeed = typingSpeeds[Math.floor(Math.random() * typingSpeeds.length)];
        setTimeout(typeNextChar, randomSpeed);
      }
    };
    
    // Start typing after a short delay
    const typingTimeout = setTimeout(typeNextChar, 500);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <video autoPlay muted loop className="hero-video">
        <source src="/back.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-subtitle">
          <span className={dotVisible ? 'blinking-dot' : 'blinking-dot hidden'}>•</span> Atom AI - Automation Partner
        </p>
        <h1 className="hero-title">
          {typedText}
          <span className="typing-cursor"></span>
        </h1>
        <p className="hero-description">
          Structure corporate YouTube-channel content from upload to corporate gallery. Use AI-powered timelines and automated chapter generation.
        </p>
        <div className="hero-buttons">
          <a 
            href="#how-to-use" 
            className="hero-button primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('how-to-use').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;