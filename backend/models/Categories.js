const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    value: {
        type: String,
        required: true,
    },
    sub: [
        {
            value: String,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Categories", CategoriesSchema);
