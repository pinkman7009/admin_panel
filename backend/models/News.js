const mongoose = require("mongoose");
const CommentSchema = require("./Comment").schema;

const NewsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [String],
  desc2: String,
  image: String,
  country: String,
  state: String,
  city: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  likes: {
    type: [String],
  },
  comments: {
    type: [CommentSchema],
  },
  shares: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Denied"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("News", NewsSchema);
