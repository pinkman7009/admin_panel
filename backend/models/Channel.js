const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videos: {
    type: [String],
  },
  subscribers: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Channel", ChannelSchema);
