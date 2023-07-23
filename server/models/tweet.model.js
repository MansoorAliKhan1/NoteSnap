const mongoose = require('mongoose');

// Define the tweet schema
const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  page:{
    type: Number,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{
    collection:'tweets'
});

// Create the tweet model
const TweetModel = mongoose.model('Tweet', tweetSchema);

module.exports = TweetModel;
