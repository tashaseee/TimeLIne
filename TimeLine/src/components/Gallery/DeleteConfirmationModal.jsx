import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ videoTitle, onConfirm, onCancel }) => {
  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
        <button className="delete-close-btn" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 className="delete-modal-title">Delete Video</h2>
        <p className="delete-modal-text">Permanently delete <span className="delete-video-title">"{videoTitle}"</span>?</p>
        <p className="delete-modal-subtext">This action is irreversible.</p>
        <div className="delete-modal-buttons">
          <button className="delete-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;