const mongoose = require("mongoose");

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
    image: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("News", NewsSchema);
