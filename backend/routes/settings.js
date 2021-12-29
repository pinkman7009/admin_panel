const express = require("express");
const route = express.Router();
const Settings = require("../models/Settings");
const auth = require("../middleware/auth");

route.post("/", auth, async (req, res) => {
  try {
    let { PrivatePolicy, TermsAndConditions, ContactUs } = req.body;

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "SETTINGS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    let array;
    array.push(ContactUs);

    ContactUs = array;

    const setting = new Settings({
      PrivatePolicy,
      TermsAndConditions,
      ContactUs,
    });

    await setting.save();

    res.status(200).json({ message: "Settings Posted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

route.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "SETTINGS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    const setting = await Settings.findById(req.params.id);

    setting.PrivatePolicy = req.body.PrivatePolicy || setting.PrivatePolicy;
    setting.TermsAndConditions =
      req.body.TermsAndConditions || setting.TermsAndConditions;
    if (req.body.contactUs) {
      setting.ContactUs.push(req.body.ContactUs);
    }

    await setting.save();

    res.status(200).json({ message: "Settings Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

route.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "SETTINGS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    const setting = await Settings.find();

    res.status(200).json({ data: setting });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
