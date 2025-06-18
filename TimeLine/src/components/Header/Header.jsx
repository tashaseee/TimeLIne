import React, { useState, useEffect } from 'react';
import './Header.css';
import logoImage from '/logo.svg';

const Header = () => {
  const [activeLang, setActiveLang] = useState('Eng');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const languages = ['Eng', 'Kz', 'Rus'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'how-to-use', 'features', 'examples', 'statistics'];
      
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

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <span className="logo-text">Timeline</span>
        </div>
        <nav className="nav-links">
          <a 
            href="#how-to-use" 
            className={`nav-link ${activeSection === 'how-to-use' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'how-to-use')}
          >
            How to Use
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
          <div 
            className="lang-dropdown" 
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <span className="nav-link">
              {activeLang}
              <i className="arrow" style={{ marginLeft: '5px', display: 'inline-block', transition: 'transform 0.3s', transform: showLangDropdown ? 'rotate(180deg)' : 'none' }}>▼</i>
            </span>
            {showLangDropdown && (
              <div className="dropdown-menu">
                {languages.map(lang => (
                  <div 
                    key={lang} 
                    className={`dropdown-item ${activeLang === lang ? 'active' : ''}`}
                    onClick={() => {
                      setActiveLang(lang);
                      setShowLangDropdown(false);
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a href="/gallery" className="nav-link btn">Gallery</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;