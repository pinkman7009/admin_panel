const mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  PrivatePolicy: String,
  TermsAndConditions: String,
  ContactUs: [
    {
      name: String,
      email: String,
      phone: Number,
      message: String,
    },
  ],
});

module.exports = mongoose.model("Settings", SettingSchema);
