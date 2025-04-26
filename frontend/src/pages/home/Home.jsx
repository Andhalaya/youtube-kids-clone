import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../../components/video/VideoCard';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await axios.get('http://localhost:3001/api/savedVideos'); 
        setVideos(res.data);
      } catch (error) {
        console.error('Error cargando los videos:', error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className='home'>
        <h1>Mis videos</h1>
        <div className="videos-list">
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
        </div>
    </div>
  )
}

export default Home