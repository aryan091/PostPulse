const e = require("express");
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
        email: String,
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        email: String,

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

 
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
