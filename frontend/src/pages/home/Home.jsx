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

  const deleteVideo = async (videoId) => {
    try {
        await axios.delete(`https://youtube-kids-clone.onrender.com/api/delete/${videoId}`);
        setSavedVideos(prev => prev.filter(video => video.videoId !== videoId));
        alert('Video eliminado');
    } catch (err) {
        console.error("Error al eliminar el video", err);
    }
};

const handleAddOrRemove = async (video) => {
    await deleteVideo(video.videoId); 
};

  return (
    <div className='home'>
      <h1>Mis videos</h1>
      <div className='videos-list'>
        {videos.map(video => (
          <div onClick={() => onVideoSelect(video)} key={video._id}>
            <VideoCard 
            video={video} 
            onAddOrRemove={handleAddOrRemove} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default Home