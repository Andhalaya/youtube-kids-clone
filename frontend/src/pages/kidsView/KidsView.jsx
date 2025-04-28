import { useEffect, useState } from 'react';
import axios from 'axios';
import './KidsView.css';

function KidsView() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/savedVideos');
        setVideos(res.data);
        if (res.data.length > 0) {
          setCurrentVideo(res.data[0]); 
        }
      } catch (error) {
        console.error('Error cargando videos', error);
      }
    };
    fetch();
  }, []);

  const handleSelectVideo = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div className="kidsView">
      {currentVideo && (
        <iframe
          width="880"
          height="450"
          src={`https://www.youtube.com/embed/${currentVideo.videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&autoplay=1`}
          allowFullScreen
          frameBorder="0"
          allow="encrypted-media"
          title={currentVideo.title}
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
