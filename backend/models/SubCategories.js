const mongoose = require("mongoose");

const SubCategoriesSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
    },
    value: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("SubCategories", SubCategoriesSchema);
