const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        username: String,
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        username: String,
      },
    ],

    totalLikes: {
      type: Number,
      default: 0,
    },

    addedBy: {
      type: String,
      required: true,
      default: "Unknown",
    },

    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
