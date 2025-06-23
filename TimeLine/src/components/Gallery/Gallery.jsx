import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GalleryHeader from '../Gallery/GalleryHeader';
import Footer from '../Footer/Footer';
import VideoInfoModal from '../Gallery/VideoInfoModal';
import DeleteConfirmationModal from '../Gallery/DeleteConfirmationModal';
import UploadBlock from '../Gallery/UploadBlock';
import LoadingProcessBlock from '../Gallery/LoadingProcessBlock';
import './Gallery.css';
import deleteIcon from '../../assets/deleteicon.svg';
import searchIcon from '../../assets/search.svg';
import calendarIcon from '../../assets/calendar.svg';
import fileIcon from '../../assets/Frame.svg';
import sizeIcon from '../../assets/Frame.svg';
import durationIcon from '../../assets/Frame.svg';
import resolutionIcon from '../../assets/Frame.svg';
import formatIcon from '../../assets/Frame.svg';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);
  const videoRefs = useRef([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [showUploadBlock, setShowUploadBlock] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadingVideoTitle, setUploadingVideoTitle] = useState('');
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, title: 'Product Demo 2025', duration: '3:45', date: '2025-06-15', tags: ['product', 'demo', 'tech'] },
    { id: 2, title: 'Showcase Video', duration: '4:10', date: '2025-06-16', tags: ['showcase', 'event'] },
    { id: 3, title: 'Tech Presentation', duration: '5:15', date: '2025-06-17', tags: ['tech', 'innovation'] },
    { id: 4, title: 'Event Highlights', duration: '3:20', date: '2025-06-14', tags: ['event', 'highlights'] },
    { id: 5, title: 'Tutorial Guide', duration: '4:50', date: '2025-06-13', tags: ['tutorial', 'education'] },
    { id: 6, title: 'Product Overview', duration: '3:45', date: '2025-06-12', tags: ['product', 'overview'] },
    { id: 7, title: 'Demo Reel 2025', duration: '3:45', date: '2025-06-11', tags: ['demo', 'reel'] },
    { id: 8, title: 'Tech Conference', duration: '3:45', date: '2025-06-10', tags: ['conference', 'tech'] },
    { id: 9, title: 'Showcase Event', duration: '3:45', date: '2025-06-09', tags: ['showcase', 'event'] },
  ]);
  const playTimeouts = useRef({});

  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
      }
    });
  }, [galleryItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    const video = videoRefs.current[index];
    if (video) {
      if (playTimeouts.current[index]) {
        clearTimeout(playTimeouts.current[index]);
      }
      playTimeouts.current[index] = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(e => console.log('Autoplay prevented:', e));
      }, 100);
    }
  };

  const handleMouseLeave = (index) => {
    setHoveredItem(null);
    const video = videoRefs.current[index];
    if (video) {
      if (playTimeouts.current[index]) {
        clearTimeout(playTimeouts.current[index]);
      }
      video.pause();
    }
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDate = !startDate || item.date === startDate.toISOString().split('T')[0];
    return matchesSearch && matchesDate;
  });

  const handleVideoClick = (item) => {
    const videoData = {
      title: item.title,
      fileName: `${item.title.toLowerCase().replace(/\s/g, '-')}.mp4`,
      size: item.file ? formatFileSize(item.file.size) : '6.66 MB',
      duration: item.duration,
      resolution: item.file ? getResolution(item.file) : '640×360',
      format: item.file ? item.file.type.split('/')[1] : 'mp4',
      timeline: [
        { time: '00:00', text: `Introduction to ${item.title}` },
        { time: '00:30 - 01:00', text: 'Main content overview' },
        { time: '01:00 - 02:00', text: 'Detailed explanation' },
      ],
      summary: `Summary of ${item.title} showcasing key features and highlights.`,
      tags: item.tags,
      processor: {
        requestHandler: '127.0.0.1',
        lastUpdate: new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    };
    setSelectedVideo(videoData);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getResolution = (file) => {
    return '1280×720';
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();
    setVideoToDelete(item);
  };

  const handleDeleteConfirm = () => {
    setGalleryItems(galleryItems.filter(item => item.id !== videoToDelete.id));
    setVideoToDelete(null);
  };

  const handleDeleteCancel = () => {
    setVideoToDelete(null);
  };

  const handleToggleUpload = () => {
    setShowUploadBlock(!showUploadBlock);
  };

  const handleUploadStart = (videoTitle) => {
    setUploadingVideoTitle(videoTitle);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    // Закрываем модальное окно сразу после начала загрузки
    setShowUploadBlock(false);
  };

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (newVideo) => {
    setGalleryItems(prevItems => [
      {
        id: newVideo.id,
        title: newVideo.title,
        duration: newVideo.duration,
        date: newVideo.date,
        tags: newVideo.tags,
        file: newVideo.file,
        previewUrl: newVideo.previewUrl
      },
      ...prevItems
    ]);
    
    setUploadComplete(true);
    setIsUploading(false);
    // Убираем автоматическое скрытие - блок остается до Log Out
  };

  const handleUploadCancel = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadingVideoTitle('');
    setUploadComplete(false);
  };

  const handleLogout = () => {
    setShowUploadBlock(false);
    // Очищаем все состояния загрузки при Log Out
    setIsUploading(false);
    setUploadComplete(false);
    setUploadingVideoTitle('');
    setUploadProgress(0);
  };

  const handleCloseModal = () => {
    setShowUploadBlock(false);
  };

  return (
    <div className="gallery-page">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/back.mp4" type="video/mp4" />
      </video>
     
      <GalleryHeader onToggleUpload={handleToggleUpload} isUploadActive={showUploadBlock} onLogout={handleLogout} />
      
      {/* Loading Process Block */}
      {(isUploading || uploadComplete) && (
        <LoadingProcessBlock 
          title={uploadingVideoTitle || 'Video Processing'} 
          progress={uploadComplete ? 100 : uploadProgress}
          onCancel={isUploading ? handleUploadCancel : undefined}
          subtitle={
            uploadComplete ? 'Upload completed successfully! Video is now available in your gallery.' :
            uploadProgress < 15 ? 'Initializing upload process...' :
            uploadProgress < 35 ? 'Uploading video file to server...' :
            uploadProgress < 60 ? 'Processing and analyzing video content...' :
            uploadProgress < 85 ? 'Optimizing video quality and formats...' :
            uploadProgress < 100 ? 'Finalizing upload and generating preview...' :
            'Processing in progress...'
          }
          insights={uploadComplete ? [
            { icon: 'CheckCircle', text: 'Video successfully uploaded and processed' },
            { icon: 'Zap', text: 'Ready for viewing in gallery' },
            { icon: 'Brain', text: 'All optimizations completed' }
          ] : undefined}
        />
      )}
      
      <main className="gallery-content">
        <div className="gallery-title-container">
          <h2 className="gallery-title">Video Gallery</h2>
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search videos..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            <div ref={calendarRef} style={{ position: 'relative' }}>
              <img 
                src={calendarIcon} 
                alt="Calendar" 
                className="calendar-icon" 
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              />
              {isCalendarOpen && (
                <div className="calendar-popup">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setIsCalendarOpen(false);
                    }}
                    inline
                    calendarClassName="custom-calendar"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="video-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className={`video-card ${hoveredItem === index ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleVideoClick(item)}
            >
              <div className="video-thumbnail-container">
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt="Video preview"
                    className="video-thumbnail"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="video-thumbnail"
                    muted
                    loop
                    playsInline
                  >
                    <source src="/back.mp4" type="video/mp4" />
                  </video>
                )}
                
                <button className="delete-button" onClick={(e) => handleDeleteClick(e, item)}>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
              
              <div className="video-info">
                <h3 className="video-title">{item.title}</h3>
                <div className="video-meta">
                  <span className="duration">{item.duration}</span>
                  <span className="date">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="video-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer activeSection="gallery" />
      
      {/* Upload Modal */}
      {showUploadBlock && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <UploadBlock 
              onClose={handleCloseModal} 
              onUploadSuccess={handleUploadSuccess}
              onUploadStart={handleUploadStart}
              onUploadProgress={handleUploadProgress}
              onUploadCancel={handleUploadCancel}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}
      
      {selectedVideo && (
        <VideoInfoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
          icons={{
            file: fileIcon,
            size: sizeIcon,
            duration: durationIcon,
            resolution: resolutionIcon,
            format: formatIcon
          }} 
        />
      )}
      
      {videoToDelete && (
        <DeleteConfirmationModal
          videoTitle={videoToDelete.title}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default Gallery;