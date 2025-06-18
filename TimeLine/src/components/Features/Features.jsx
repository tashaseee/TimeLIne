import React from 'react';
import './Features.css';
import featuresImage from '/frame2.svg';

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="features-content">
        <h2 className="features-title">FEATURES</h2>
        <p className="features-subtitle">
          AI-powered tools ensuring high-quality and efficient processing of corporate video content.
        </p>
        <div className="features-diagram">
          <img src={featuresImage} alt="Features Diagram" className="diagram-image" />
        </div>
      </div>
    </section>
  );
};

export default Features;