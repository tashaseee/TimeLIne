import React, { useState, useRef } from 'react';
import './UploadBlock.css';
import LoadingProcessBlock from './LoadingProcessBlock';

const UploadBlock = ({ onClose, onUploadSuccess, onLogout }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);
  const uploadBlockRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setMessage('Please select a video file.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage('File size should be less than 50MB.');
      return;
    }

    setSelectedFile(file);
    setMessage('');

    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.src = url;
    
    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPreviewUrl(canvas.toDataURL('image/jpeg'));
      URL.revokeObjectURL(url);
    };
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setMessage('Please select a video file and enter a title.');
      return;
    }

    setIsUploading(true);
    setMessage('Uploading video...');

    try {
      // Simulate video upload (3 seconds)
      for (let i = 0; i <= 60; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 3 seconds total
        setUploadProgress(i);
      }

      setMessage('Video uploaded, starting AI processing...');
      setIsAIProcessing(true);

      // Simulate AI processing (7 seconds)
      for (let i = 60; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 1750)); // 7 seconds total
        setUploadProgress(i);
      }

      const duration = await getVideoDuration(selectedFile);
      
      const newVideo = {
        id: Date.now(),
        title: title,
        duration: formatDuration(duration),
        date: new Date().toISOString().split('T')[0],
        tags: tag ? [tag] : [],
        file: selectedFile,
        previewUrl: previewUrl
      };

      onUploadSuccess(newVideo);
      setMessage('Video and AI processing completed successfully!');
      setKeepVisible(true); // Keep visible until logout
    } catch (error) {
      setMessage('Upload or processing failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const handleLogout = () => {
    setKeepVisible(false);
    onLogout();
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const url = URL.createObjectURL(file);
      video.src = url;
      
      video.onloadedmetadata = () => {
        resolve(video.duration);
        URL.revokeObjectURL(url);
      };
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="upload-block" ref={uploadBlockRef}>
      <div className="upload-title">Upload New Video</div>
      <div className="upload-form">
        <div className="upload-fields">
          <div className="upload-field">
            <label>Video Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter video title" 
            />
          </div>
          <div className="upload-field">
            <label>Tag</label>
            <input 
              type="text" 
              value={tag} 
              onChange={(e) => setTag(e.target.value)} 
              placeholder="Enter tag (optional)" 
            />
          </div>
        </div>
        <div className="upload-file">
          {previewUrl ? (
            <div className="preview-container">
              <img 
                src={previewUrl} 
                alt="Video preview" 
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '12px'
                }}
              />
              <p style={{ color: '#e0e0e0', marginBottom: '12px' }}>
                {selectedFile?.name}
              </p>
            </div>
          ) : (
            <span>Upload your video file here</span>
          )}
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleFileChange} 
            style={{ display: 'none' }}
            id="video-upload"
          />
          <label 
            htmlFor="video-upload" 
            className="browse-btn"
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            {previewUrl ? 'Change Video' : 'Select Video'}
          </label>
        </div>
      </div>
      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress < 60 ? uploadProgress * 1.6667 : 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {uploadProgress < 60 ? `Uploading: ${Math.round(uploadProgress / 1.6667)}%` : 'AI Processing...'}
          </span>
        </div>
      )}
      <div className="buttons-container">
        <button 
          className="process-btn" 
          onClick={onClose}
          style={{ background: '#2a2a2a' }}
        >
          Cancel
        </button>
        <button 
          className="process-btn" 
          onClick={handleUpload}
          disabled={isUploading || !selectedFile || !title.trim()}
          style={{ 
            opacity: isUploading || !selectedFile || !title.trim() ? 0.7 : 1,
            cursor: isUploading || !selectedFile || !title.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? 'Processing...' : 'Upload'}
        </button>
      </div>
      {message && <div className="upload-message">{message}</div>}
      {(isAIProcessing || keepVisible) && (
        <LoadingProcessBlock 
          title={title || 'New Video'} 
          progress={uploadProgress} 
        />
      )}
    </div>
  );
};

export default UploadBlock;