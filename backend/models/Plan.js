const mongoose = require("mongoose");

const PlansSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  monthly_price: {
    type: Number,
    required: true,
  },
  annually_price: {
    type: Number,
    required: true,
  },
  createPostLimit: Number,
  viewPost: Boolean,
  canComment: Boolean,
  canDeletePost: Boolean,
  viewChannel: Boolean,
  createChannel: Boolean,
  editChannel: Boolean,
  deleteChannel: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", PlansSchema);
