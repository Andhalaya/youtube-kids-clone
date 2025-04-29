import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../../components/video/VideoCard';
import './ParentView.css';

function ParentView() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [savedVideos, setSavedVideos] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]); 
    const userId = 'usuario123'; 

    useEffect(() => {
        // Cargar los videos guardados
        const fetchSavedVideos = async () => {
            try {
                const res = await axios.get('https://youtube-kids-clone.onrender.com/api/savedVideos');
                setSavedVideos(res.data);
            } catch (err) {
                console.error("Error al cargar los videos guardados", err);
            }
        };
        fetchSavedVideos();
    }, []);

    useEffect(() => {
        // Cargar el historial de búsqueda
        const fetchSearchHistory = async () => {
            try {
                const res = await axios.get(`https://youtube-kids-clone.onrender.com/api/history/${userId}`);
                setSearchHistory(res.data.map(item => item.query)); 
            } catch (err) {
                console.error("Error al cargar el historial de búsqueda", err);
            }
        };
        fetchSearchHistory();
    }, [userId]);

    // Función para realizar la búsqueda
    const search = async (query, pageToken = '') => {
        setResults([]);
        const res = await axios.get(`https://youtube-kids-clone.onrender.com/api/search`, {
            params: { q: query, pageToken }
        });
        setResults(prev => [...prev, ...res.data.videos]);
        setNextPageToken(res.data.nextPageToken);

        // Guardar el historial de búsqueda en la base de datos
        try {
            await axios.post('https://youtube-kids-clone.onrender.com/api/history/add', { userId, query });
        } catch (err) {
            console.error("Error al guardar la búsqueda", err);
        }

        // Actualizar el estado local del historial de búsqueda
        setSearchHistory(prev => [query, ...prev.filter(item => item !== query)].slice(0, 5)); // Limitar a 5 búsquedas
        
    };

    // Guardar un video
    const saveVideo = async (video) => {
        try {
            await axios.post('https://youtube-kids-clone.onrender.com/api/save', video);
            setSavedVideos(prev => [...prev, video]);
            alert('Video guardado');
        } catch (err) {
            console.error("Error al guardar el video", err);
        }
    };

    // Eliminar un video
    const deleteVideo = async (videoId) => {
        try {
            await axios.delete(`https://youtube-kids-clone.onrender.com/api/delete/${videoId}`);
            setSavedVideos(prev => prev.filter(video => video.videoId !== videoId));
            alert('Video eliminado');
        } catch (err) {
            console.error("Error al eliminar el video", err);
        }
    };

    // Manejar agregar o quitar videos de la lista guardada
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

                {/* Mostrar historial de búsqueda */}
                {searchHistory.length > 0 && (
                    <div className="search-history">
                        <h3>Historial de Búsquedas</h3>
                        <ul>
                            {searchHistory.map((historyItem, index) => (
                                <li key={index} onClick={() => setQuery(historyItem)}>
                                    {historyItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
