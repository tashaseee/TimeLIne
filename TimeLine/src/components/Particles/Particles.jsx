import React, { useEffect } from 'react';

const Particles = () => {
  useEffect(() => {
    const canvas = document.createElement('div');
    canvas.className = 'particles-container';
    document.body.appendChild(canvas);

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      canvas.appendChild(particle);

      // Remove particle after animation
      particle.addEventListener('animationend', () => particle.remove());
    };

    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    // Continuously add new particles
    const interval = setInterval(createParticle, 1000);
    return () => {
      clearInterval(interval);
      canvas.remove();
    };
  }, []);

  return null; // No render output, handled by useEffect
};

export default Particles;