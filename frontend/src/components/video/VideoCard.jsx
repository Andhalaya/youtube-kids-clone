import React from 'react';
import './VideoCard.css'; 

function VideoCard({ video, isSaved = false, onAddOrRemove, showAddButton = true }) {
  return (
    <div className="video-card">
      <div className="thumbnail-container">
        <img 
          src={video.thumbnail} 
          alt="Video thumbnail" 
          className="video-thumbnail"
        />
        {showAddButton && (
          <button className="add-button" onClick={() => onAddOrRemove(video)}>
            {isSaved ? '－' : '＋'}
          </button>
        )}
      </div>

      <div className="video-info">
        <img 
          src={video.thumbnail} 
          alt="Channel thumbnail" 
          className="channel-thumbnail"
        />
        <div className="text-info">
          <h3 className="video-title">{video.title.slice(0, 10)}...</h3>
          <p className="channel-title">{video.channelTitle.slice(0, 15)}...</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
