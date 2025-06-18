import React from 'react';
import './HowToUse.css';
import howToUseImage from '/frame12.svg';

const HowToUse = () => {
  return (
    <section className="how-to-use" id="how-to-use">
      <div className="how-to-use-content">
        <h2 className="how-to-use-title">HOW TO USE TIMELINE</h2>
        <p className="how-to-use-subtitle">
          Follow these simple steps to structure your recording more effectively with AI-tools
        </p>
        <div className="how-to-use-diagram">
          <img src={howToUseImage} alt="How to Use Timeline Diagram" className="diagram-image" />
        </div>
      </div>
    </section>
  );
};

export default HowToUse;