const axios = require('axios');
require('dotenv').config(); 
const API_KEY = process.env.YT_API_KEY;

async function searchVideos(query, pageToken = '') {
  const url = 'https://www.googleapis.com/youtube/v3/search';

  const res = await axios.get(url, {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 10,
      pageToken: pageToken,
      order: 'relevance',
      key: API_KEY
    }
  });

  return {
    videos: res.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    })),
    nextPageToken: res.data.nextPageToken
  };  
}

module.exports = { searchVideos };
