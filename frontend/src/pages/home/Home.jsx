import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../../components/video/VideoCard';

function Home({ onVideoSelect }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await axios.get('https://youtube-kids-clone.onrender.com/api/savedVideos');
      setVideos(res.data);
    }
    fetchVideos();
  }, []);

  return (
    <div className='home'>
      <h1>Mis videos</h1>
      <div className='videos-list'>
        {videos.map(video => (
          <div onClick={() => onVideoSelect(video)} key={video._id}>
            <VideoCard video={video} showAddButton={false} />
          </div>
        ))}
      </div>
    </div>
  );
}


export default Home