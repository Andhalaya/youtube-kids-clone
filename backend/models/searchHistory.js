const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    query: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;
