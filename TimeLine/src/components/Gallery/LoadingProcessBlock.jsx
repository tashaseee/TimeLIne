import React, { useState, useEffect } from 'react';
import { X, Cpu, Wand2, Brain, Zap, CheckCircle, Clock } from 'lucide-react';
import './LoadingProcessBlock.css';

const LoadingProcessBlock = ({ 
  title = "AI Processing", 
  progress = 45, 
  onCancel,
  subtitle,
  insights 
}) => {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { name: 'Queue', icon: Clock, threshold: 0 },
    { name: 'Audio', icon: Wand2, threshold: 20 },
    { name: 'Video', icon: Cpu, threshold: 40 },
    { name: 'Analyze', icon: Brain, threshold: 60 },
    { name: 'Optimize', icon: Zap, threshold: 80 },
    { name: 'Complete', icon: CheckCircle, threshold: 100 }
  ];

  const defaultInsights = [
    { icon: Brain, text: 'Enhanced video quality detected' },
    { icon: Zap, text: 'Audio optimization in progress' },
    { icon: Cpu, text: `Neural processing: ${Math.round(progress)}% complete` }
  ];

  const currentInsights = insights || defaultInsights;

  useEffect(() => {
    for (let i = stages.length - 1; i >= 0; i--) {
      if (progress >= stages[i].threshold) {
        setCurrentStage(i);
        break;
      }
    }
  }, [progress]);

  const getCurrentStageData = () => stages[currentStage] || stages[0];
  const isComplete = progress >= 100;

  const getProcessingSubtitle = () => {
    if (subtitle) return subtitle;
    if (isComplete) return 'Processing completed successfully!';
    return `${getCurrentStageData().name} processing in progress...`;
  };

  return (
    <div className="ai-processing-container">
      {/* Header */}
      <div className="processing-header">
        <div className="processing-main">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
          
          <div className="processing-info">
            <h3 className="processing-title">{title}</h3>
            <p className="processing-subtitle">
              {getProcessingSubtitle()}
            </p>
            <div className="processing-stats">
              <div className="stat">
                <span className="stat-label">Stage:</span>
                <span className="stat-value">{currentStage + 1}/6</span>
              </div>
              <div className="stat">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {onCancel && (
          <button className="close-processing" onClick={onCancel} title="Cancel Process">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="progress-percentage">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="stages-section">
        {stages.map((stage, index) => {
          const StageIcon = stage.icon;
          const isActive = index <= currentStage;
          const isCurrent = index === currentStage && !isComplete;
          
          return (
            <div 
              key={stage.name} 
              className={`stage-item ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
              title={`${stage.name} - ${isActive ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}`}
            >
              <div className="stage-icon">
                <StageIcon size={18} />
              </div>
              <span className="stage-name">{stage.name}</span>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="insights-section">
        <h4 className="insights-title">Processing Status</h4>
        <div className="insights-list">
          {currentInsights.map((insight, index) => {
            const InsightIcon = insight.icon;
            let insightText = insight.text;
            
            // Dynamic text updates based on progress
            if (insight.icon === Zap) {
              insightText = isComplete ? 'Audio optimization completed' : 'Audio optimization in progress';
            } else if (insight.icon === Cpu) {
              insightText = `Neural processing: ${Math.round(progress)}% complete`;
            }
            
            return (
              <div key={index} className="insight-item">
                <InsightIcon size={16} />
                <span>{insightText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingProcessBlock;