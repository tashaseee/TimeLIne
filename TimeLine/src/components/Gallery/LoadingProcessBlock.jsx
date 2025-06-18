import React from 'react';
import { Trash2, X } from 'lucide-react';
import './LoadingProcessBlock.css';

const LoadingProcessBlock = ({ title = "Processing Video", progress }) => {
  const getStageStatus = (stageProgress) => {
    return progress >= stageProgress ? 'completed' : 'pending';
  };

  const stages = [
    { name: 'QUEUE', threshold: 15 },
    { name: 'AUDIO', threshold: 30 },
    { name: 'VIDEO', threshold: 50 },
    { name: 'PROCESS', threshold: 70 },
    { name: 'FINALIZE', threshold: 90 },
    { name: 'DONE', threshold: 100 }
  ];

  return (
    <div className="compact-loading-container">
      <div className="loading-header">
        <div className="loading-title-container">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
          </div>
          <div>
            <h3 className="loading-title">{title}</h3>
            <p className="loading-subtitle">Processing with AI...</p>
          </div>
        </div>
        <button className="loading-cancel-btn">
          <X size={18} />
        </button>
      </div>

      <div className="compact-progress-container">
        <div className="compact-progress-bar">
          <div 
            className="compact-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="compact-progress-text">{Math.round(progress)}%</span>
      </div>

      <div className="compact-stages">
        {stages.map((stage, index) => (
          <div key={stage.name} className="compact-stage-item">
            <div 
              className={`compact-stage-dot ${
                getStageStatus(stage.threshold) === 'completed' ? 'completed' : ''
              }`}
            ></div>
            <span 
              className={`compact-stage-label ${
                getStageStatus(stage.threshold) === 'completed' ? 'completed' : ''
              }`}
            >
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingProcessBlock;