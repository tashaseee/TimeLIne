// Footer.jsx (добавляем обработку страницы галереи)
import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = ({ activeSection }) => {
  // Упрощаем логику, так как на странице галереи скролл не нужен
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // Если мы на странице галереи, делаем переход на главную
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-circle">○</span>
          <span className="logo-text">Timeline</span>
        </div>
        <nav className="footer-nav">
          <a 
            href="#how-to-use" 
            className={`nav-link ${activeSection === 'how-to-use' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'how-to-use')}
          >
            How to use
          </a>
          <a 
            href="#features" 
            className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a 
            href="#examples" 
            className={`nav-link ${activeSection === 'examples' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'examples')}
          >
            Examples
          </a>
          <a 
            href="/gallery" 
            className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
          >
            Gallery
          </a>
        </nav>
        <div className="footer-copyright">
          2025, © INZHENERNY TSENTR UPRAVLENIYA MATERIALNO-TEKHNICHESKOGO OBESPECHENIYA, GP
        </div>
      </div>
    </footer>
  );
};

export default Footer;