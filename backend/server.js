const express = require('express');
const app = express();
const Video = require('./models/videoModel');
const cors = require('cors');
const { searchVideos } = require('./youtube'); 
const { dbConnection } = require('./config/db');

dbConnection();

app.use(cors());
app.use(express.json());


// Ruta para guardar un video
app.post('/api/save', async (req, res) => {
  try {
    console.log("req.body recibido:", req.body);
    const { videoId, title, thumbnail } = req.body;
    const savedVideo = new Video({ videoId, title, thumbnail });
    await savedVideo.save();
    res.status(200).json({ message: 'Video guardado correctamente' });
  } catch (err) {
    console.error("Error al guardar el video:", err);
  res.status(500).json({ error: 'Error al guardar el video', details: err.message })
  }
});

app.get('/api/savedVideos', async (req, res) => {
    try {
      const videos = await Video.find();
      res.status(200).json(videos);

    } catch (err) {
      console.error('Error al obtener los videos:', err);
      res.status(500).json({ error: 'Error al obtener los videos', details: err.message });
    }
  });

// Ruta para eliminar un video
app.delete('/api/delete/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    await Video.findOneAndDelete({ videoId });
    res.status(200).json({ message: 'Video eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el video' });
  }
});

// Ruta de búsqueda de videos
app.get('/api/search', async (req, res) => {
  const { q, pageToken } = req.query;
  try {
    const results = await searchVideos(q, pageToken);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar videos' });
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
