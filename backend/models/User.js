const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  role: {
    type: Number,
    required: true,
  },
  roleType: String,
  roleTitle: String,
  permissions: {
    type: Array,
    default: [],
    required: false,
  },
  categories_permissions: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
    },
  ],
  membership_plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    default: null,
  },
  blockedStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  linkedin: {
    type: String,
  },
  bio: {
    type: String,
  },
  ip: {
    type: String,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
