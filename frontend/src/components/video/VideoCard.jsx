import React from 'react';
import './VideoCard.css'; 

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <img 
        src={video.thumbnail} 
        alt="Video thumbnail" 
        className="video-thumbnail"
      />
      <div className="video-info">
        <img 
          src={video.thumbnail} 
          alt="Channel thumbnail" 
          className="channel-thumbnail"
          width={"160px"} height={"106px"}
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
