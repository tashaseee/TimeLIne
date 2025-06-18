import React, { useState } from 'react';
import './GalleryHeader.css';
import logoImage from '/logo.svg';

const GalleryHeader = ({ onToggleUpload, isUploadActive }) => {
  const [activeLang, setActiveLang] = useState('Eng');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = ['Eng', 'Kz', 'Rus'];

  return (
    <header className="gallery-header">
      <div className="gallery-header-content">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <span className="logo-text">Timeline</span>
        </div>
        <nav className="nav-links">
          <div 
            className="lang-dropdown" 
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <span className="nav-link">
              {activeLang}
              <i className="arrow" style={{ 
                marginLeft: '5px', 
                display: 'inline-block', 
                transition: 'transform 0.3s', 
                transform: showLangDropdown ? 'rotate(180deg)' : 'none' 
              }}>▼</i>
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
          
          <button className="upload-btn" onClick={onToggleUpload}>
            <span>{isUploadActive ? 'Log Out' : 'Upload'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ marginLeft: '8px' }}
            >
              {isUploadActive ? (
                <>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </>
              ) : (
                <>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default GalleryHeader;