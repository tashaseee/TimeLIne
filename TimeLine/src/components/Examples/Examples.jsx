import React, { useState, useEffect, memo } from 'react';
import './Examples.css';

const TextItem = memo(({ text, index, isActive, formatTime }) => (
  <p
    key={index}
    className={`sidebar-text-item ${isActive ? 'active-text' : ''}`}
  >
    <span className="timestamp">{formatTime(index)}</span> {text}
  </p>
));

const Examples = () => {
  const images = [
    '/example1.png',
    '/example2.png',
    '/example3.png',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const textSections = [
    `(РАУ Альберт Павлович) Говорящий хочет узнать, как сейчас организован входной контроль импортируемой продукции...`,
    `(Unknown) Санитарно-эпидемиологическая служба осуществляет контроль импортной продукции...`,
    `(Unknown) Текст выражает благодарность за оперативные меры по усилению контроля...`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const formatTime = (index) => {
    const totalSeconds = index * 30;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
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
                  className={`carousel-item ${index === currentIndex ? 'active' : index === (currentIndex + 1) % images.length ? 'next' : 'prev'}`}
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="examples-sidebar">
            <div className="sidebar-text">
              {textSections.map((text, index) => (
                <TextItem
                  key={index}
                  text={text}
                  index={index}
                  isActive={index === currentIndex}
                  formatTime={formatTime}
                />
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