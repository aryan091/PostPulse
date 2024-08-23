const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageAvatar: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  totalLikes: {
    type: Number,
    default: 0,
  },
  addedBy: {
    type: String,
    required: true,
    default: 'Unknown',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
