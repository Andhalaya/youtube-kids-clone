const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  channelId: { type: String, required: true },
  channelTitle: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
