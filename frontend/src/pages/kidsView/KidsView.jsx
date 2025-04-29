import { useEffect, useState } from 'react';
import axios from 'axios';
import './KidsView.css';

function KidsView({ currentVideo }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('https://youtube-kids-clone.onrender.com/api/savedVideos');
      setVideos(res.data);
      if (!currentVideo && res.data.length > 0) {
        setSelectedVideo(res.data[0]);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (currentVideo) {
      setSelectedVideo(currentVideo);
    }
  }, [currentVideo]);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="kidsView">
      {selectedVideo && (
        <iframe
          src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&autoplay=1`}
          allowFullScreen
          width="90%"
          height="70%"
          allow="encrypted-media"
          title={selectedVideo.title}
          style={{ borderRadius: 15, border: 'none' }}
        ></iframe>
      )}

      <div className="suggestions">
        {videos.map((v) => (  
          <div 
            key={v.videoId} 
            className="thumbnail"
            onClick={() => handleSelectVideo(v)} 
            style={{ cursor: 'pointer' }}
          >
            <img src={v.thumbnail} alt="" width="160px" height="106px" />
            <div className="channel-info">
              <img src={v.thumbnail} alt="" />
              <div>
                <p style={{ fontWeight: "700" }}>{v.title.slice(0, 15)}...</p>
                <p>{v.channelTitle.slice(0, 15)}...</p>
              </div>
            </div>
          </div>  
        ))}
      </div>
    </div>
  );
}

export default KidsView;
