const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
  
    password: {
      type: String,
      required: true,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
      timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);