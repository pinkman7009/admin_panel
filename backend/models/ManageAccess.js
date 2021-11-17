const mongoose = require("mongoose");

const ManageAccessSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    roleType: String,
    permissions: {
        type: Array,
        default: [],
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ManageAccess", ManageAccessSchema);
