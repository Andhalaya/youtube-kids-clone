import { useState, useEffect } from 'react';
import axios from 'axios';

function ParentView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [savedVideos, setSavedVideos] = useState([]); // Lista de videos guardados

  // Cargar videos guardados desde MongoDB al montar el componente
  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/savedVideos');
        setSavedVideos(res.data); // Guardar videos de la base de datos
      } catch (err) {
        console.error("Error al cargar los videos guardados", err);
      }
    };
    fetchSavedVideos();
  }, []);

  // Función para realizar la búsqueda
  const search = async (query, pageToken = '') => {
    const res = await axios.get(`http://localhost:3001/api/search`, {
      params: { q: query, pageToken }
    });

    setResults(prev => [...prev, ...res.data.videos]);
    setNextPageToken(res.data.nextPageToken);
  };

  // Función para guardar un video
  const saveVideo = async (video) => {
    try {
      await axios.post('http://localhost:3001/api/save', video);
      setSavedVideos(prev => [...prev, video]);
      alert('Video guardado');
    } catch (err) {
      console.error("Error al guardar el video", err);
    }
  };

  // Función para eliminar un video
  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:3001/api/delete/${videoId}`);
      setSavedVideos(prev => prev.filter(video => video.videoId !== videoId)); // Eliminar del estado
      alert('Video eliminado');
    } catch (err) {
      console.error("Error al eliminar el video", err);
    }
  };

  return (
    <div>
      <h2>Buscar videos</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => search(query)}>Buscar</button>

      <ul>
        {results.map(video => (
          <li key={video.videoId}>
            <img src={video.thumbnail} alt="" />
            {video.title}
            <button onClick={() => saveVideo(video)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Videos guardados</h2>
      <ul>
        {savedVideos.map(video => (
          <li key={video.videoId}>
            <img src={video.thumbnail} alt="" />
            {video.title}
            <button onClick={() => deleteVideo(video.videoId)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {nextPageToken && <button onClick={() => search(query, nextPageToken)}>Ver más</button>}
    </div>
  );
}

export default ParentView;
