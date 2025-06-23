import React from 'react';
import './VideoInfoModal.css';

const VideoInfoModal = ({ video, onClose, icons }) => {
  if (!video) return null;

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-main">
          <h2 className="modal-title">{video.title}</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <div className="info-item-header">
                <img src={icons.file} alt="File" className="icon" />
                <span className="label">File name</span>
              </div>
              <span className="value">{video.fileName}</span>
            </div>
            
            <div className="info-item">
              <div className="info-item-header">
                <img src={icons.size} alt="Size" className="icon" />
                <span className="label">Size</span>
              </div>
              <span className="value">{video.size}</span>
            </div>
            
            <div className="info-item">
              <div className="info-item-header">
                <img src={icons.duration} alt="Duration" className="icon" />
                <span className="label">Duration</span>
              </div>
              <span className="value">{video.duration}</span>
            </div>
            
            <div className="info-item">
              <div className="info-item-header">
                <img src={icons.resolution} alt="Resolution" className="icon" />
                <span className="label">Resolution</span>
              </div>
              <span className="value">{video.resolution}</span>
            </div>
            
            <div className="info-item">
              <div className="info-item-header">
                <img src={icons.format} alt="Format" className="icon" />
                <span className="label">Format</span>
              </div>
              <span className="value">{video.format}</span>
            </div>
          </div>
          
          <div className="section">
            <h3 className="section-title">Processor Info</h3>
            <div className="processor-info">
              <div className="info-item">
                <span className="label">Request Handler</span>
                <span className="value">{video.processor.requestHandler}</span>
              </div>
              <div className="info-item">
                <span className="label">Last Update</span>
                <span className="value">{video.processor.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-sidebar">
          <div className="section">
            <h3 className="section-title">Timeline</h3>
            <button 
              className="copy-btn" 
              onClick={() => handleCopyText(video.timeline.map(item => `${item.time}: ${item.text}`).join('\n'))}
              title="Copy timeline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <div className="timeline-section">
              {video.timeline.map((item, index) => (
                <div key={index} className="timeline-entry">
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="section">
            <h3 className="section-title">Summary</h3>
            <button 
              className="copy-btn" 
              onClick={() => handleCopyText(video.summary)}
              title="Copy summary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <p className="summary-text">{video.summary}</p>
          </div>
          
          <div className="section">
            <h3 className="section-title">Tags</h3>
            <div className="tags-list">
              {video.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <button className="publish-btn">Publish Video</button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfoModal;