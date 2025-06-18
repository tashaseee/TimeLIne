import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import './SmokeBackground.css';

const SmokeBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        onClick: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        enable: false,
      },
      move: {
        direction: 'right',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: { min: 0.2, max: 0.4 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.2,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 10, max: 30 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 10,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="smoke-background"
    />
  );
};

export default SmokeBackground;