import { useEffect, useState } from 'react';
import axios from 'axios';

function KidsView() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:3001/api/savedVideos');
      setVideos(res.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Videos para niños</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {videos.map(v => (
          <iframe
            key={v.videoId}
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/${v.videoId}`}
            allowFullScreen
            title={v.title}
            style={{ margin: 10 }}
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default KidsView;
