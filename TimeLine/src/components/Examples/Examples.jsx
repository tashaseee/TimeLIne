import React, { useState, useEffect } from 'react';
import './Examples.css';

const Examples = () => {
  const images = [
    '/example1.png',
    '/example2.png',
    '/example3.png',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  const textSections = [
    `(РАУ Альберт Павлович) Говорящий хочет узнать, как сейчас организован входной контроль импортируемой продукции...`,
    `(Unknown) Санитарно-эпидемиологическая служба осуществляет контроль импортной продукции...`,
    `(Unknown) Текст выражает благодарность за оперативные меры по усилению контроля...`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setActiveTextIndex((prev) => (prev + 1) % textSections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, textSections.length]);

  const formatTime = (index) => {
    const hours = Math.floor(index * 0.5);
    const minutes = (index * 30) % 60;
    const seconds = (index * 20) % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="examples" id="examples">
      <div className="examples-content">
        <h2 className="examples-title">EXAMPLES</h2>
        <p className="examples-impact-text">
          Dive into Timeline's total impact: every analyzed video, every recognized word, and every face - tracked across all timeframes.
        </p>
        <div className="examples-container">
          <div className="examples-carousel">
            <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="examples-sidebar">
            <div className="sidebar-text">
              {textSections.map((text, index) => (
                <p 
                  key={index}
                  className={index === activeTextIndex ? 'active-text' : ''}
                >
                  <span className="timestamp">{formatTime(index)}</span> {text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <p className="examples-bottom-text">
          Explore more examples and see how our technology transforms raw data into actionable insights.
        </p>
      </div>
    </section>
  );
};

export default Examples;