import React, { useState, useRef } from 'react';
import './UploadBlock.css';

const UploadBlock = ({ onClose, onUploadSuccess, onUploadStart, onUploadProgress, onUploadCancel, onLogout }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
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
    setMessage('');

    // Notify parent component that upload started
    if (onUploadStart) {
      onUploadStart(title);
    }

    try {
      // Simulate 10-second upload process with smooth progress
      const totalSteps = 100;
      const stepDelay = 100; // 100ms per step = 10 seconds total
      
      for (let i = 0; i <= totalSteps; i += 1) {
        await new Promise(resolve => setTimeout(resolve, stepDelay));
        setUploadProgress(i);
        
        // Send progress to parent component
        if (onUploadProgress) {
          onUploadProgress(i);
        }
        
        // Add some realistic pauses at certain milestones
        if (i === 15) {
          await new Promise(resolve => setTimeout(resolve, 200));
        } else if (i === 35) {
          await new Promise(resolve => setTimeout(resolve, 300));
        } else if (i === 60) {
          await new Promise(resolve => setTimeout(resolve, 250));
        } else if (i === 85) {
          await new Promise(resolve => setTimeout(resolve, 400));
        }
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

      // Small delay before completion
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onUploadSuccess(newVideo);
      setMessage('Video processing completed successfully!');
      
      // Modal will be closed by parent component when upload starts
      
    } catch (error) {
      setMessage('Upload failed. Please try again.');
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTitle('');
    setTag('');
    setMessage('');
    setPreviewUrl(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleCancel = () => {
    if (isUploading) {
      // Cancel upload process
      setIsUploading(false);
      setUploadProgress(0);
      setMessage('Upload cancelled.');
      
      // Notify parent component about cancellation
      if (onUploadCancel) {
        onUploadCancel();
      }
      
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      onClose();
    }
  };

  const handleLogout = () => {
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
    <>
      <div className="upload-block" ref={uploadBlockRef}>
        <h2 className="upload-title">Upload Video</h2>
        
        <div className="upload-form">
          <div className="upload-fields">
            <div className="upload-field">
              <label>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter video title"
                disabled={isUploading}
              />
            </div>
            
            <div className="upload-field">
              <label>Tag</label>
              <input 
                type="text" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
                placeholder="Add a tag"
                disabled={isUploading}
              />
            </div>
          </div>
          
          <div 
            className="upload-file"
            onClick={() => !isUploading && document.getElementById('video-upload').click()}
            style={{ 
              opacity: isUploading ? 0.6 : 1, 
              cursor: isUploading ? 'not-allowed' : 'pointer' 
            }}
          >
            {previewUrl ? (
              <div className="preview-container">
                <img 
                  src={previewUrl} 
                  alt="Video preview"
                />
                <p>{selectedFile?.name}</p>
              </div>
            ) : (
              <>
                <span>Drop video file here or click to browse</span>
                <div className="browse-btn">
                  Select File
                </div>
              </>
            )}
            
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }}
              id="video-upload"
              disabled={isUploading}
            />
          </div>
        </div>
        
        <div className="buttons-container">
          <button 
            className="process-btn" 
            onClick={handleCancel}
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            {isUploading ? 'Cancel' : 'Close'}
          </button>
          <button 
            className="process-btn" 
            onClick={handleUpload}
            disabled={isUploading || !selectedFile || !title.trim()}
          >
            {isUploading ? 'Processing...' : 'Upload'}
          </button>
        </div>
        
        {message && (
          <div className="upload-message">
            {message}
          </div>
        )}
      </div>
      

    </>
  );
};

export default UploadBlock;