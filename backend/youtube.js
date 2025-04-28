const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.YT_API_KEY;

// Función para obtener info del canal (nombre + foto)
async function getChannelInfo(channelId) {
  const url = 'https://www.googleapis.com/youtube/v3/channels';

  const res = await axios.get(url, {
    params: {
      part: 'snippet',
      id: channelId,
      key: API_KEY
    }
  });

  const channel = res.data.items[0];

  return {
    channelTitle: channel.snippet.title,
    channelThumbnail: channel.snippet.thumbnails.default.url
  };
}

// Función principal para buscar videos y agregar info del canal
async function searchVideos(query, pageToken = '') {
  const url = 'https://www.googleapis.com/youtube/v3/search';

  const res = await axios.get(url, {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 8,
      pageToken: pageToken,
      order: 'relevance',
      key: API_KEY
    }
  });

  const videos = await Promise.all(
    res.data.items.map(async (item) => {
      const { channelTitle, channelThumbnail } = await getChannelInfo(item.snippet.channelId);

      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        thumbnail: item.snippet.thumbnails.default.url,
        channelTitle,
        channelThumbnail
      };
    })
  );

  return {
    videos,
    nextPageToken: res.data.nextPageToken,
  };
}

module.exports = { searchVideos };
