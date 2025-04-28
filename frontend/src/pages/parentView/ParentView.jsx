import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../../components/video/VideoCard';
import './ParentView.css';

function ParentView() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [savedVideos, setSavedVideos] = useState([]);

    useEffect(() => {
        const fetchSavedVideos = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/savedVideos');
                setSavedVideos(res.data);
            } catch (err) {
                console.error("Error al cargar los videos guardados", err);
            }
        };
        fetchSavedVideos();
    }, []);

    const search = async (query, pageToken = '') => {
        const res = await axios.get(`http://localhost:3001/api/search`, {
            params: { q: query, pageToken }
        });
        setResults(prev => [...prev, ...res.data.videos]);
        setNextPageToken(res.data.nextPageToken);
    };

    const saveVideo = async (video) => {
        try {
            await axios.post('http://localhost:3001/api/save', video);
            setSavedVideos(prev => [...prev, video]);
            alert('Video guardado');
        } catch (err) {
            console.error("Error al guardar el video", err);
        }
    };

    const deleteVideo = async (videoId) => {
        try {
            await axios.delete(`http://localhost:3001/api/delete/${videoId}`);
            setSavedVideos(prev => prev.filter(video => video.videoId !== videoId));
            alert('Video eliminado');
        } catch (err) {
            console.error("Error al eliminar el video", err);
        }
    };

    const handleAddOrRemove = async (video) => {
        const isAlreadySaved = savedVideos.some(v => v.videoId === video.videoId);

        if (isAlreadySaved) {
            await deleteVideo(video.videoId);
        } else {
            await saveVideo(video);
        }
    };

    return (
        <div className="parentView">
            <div className="search-section">
                <h2>Añadir videos a la colección</h2>
                <div className="search-bar">
                    <input 
                        value={query}
                        placeholder="Buscar..."
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button onClick={() => search(query)}>🔍</button>
                </div>
            </div>
            <div className='div'>
              <div className="results-grid">
                {results.map(video => {
                    const isSaved = savedVideos.some(v => v.videoId === video.videoId);
                    return (
                        <VideoCard 
                            key={video.videoId}
                            video={video}
                            isSaved={isSaved}
                            onAddOrRemove={handleAddOrRemove}
                        />
                    );
                })}
            </div>
  
            </div>
            
            {nextPageToken && (
                <div className="show-more">
                    <button onClick={() => search(query, nextPageToken)}>Show more</button>
                </div>
            )}
        </div>
    );
}

export default ParentView;
