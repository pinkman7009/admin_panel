const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "MANAGE_ACCESS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    const users = await User.find()
      .sort({
        date: -1,
      })
      .select("-password")
      .populate("membership_plan");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  auth,
  [
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("role").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      lastname,
      role,
      email,
      password,
      permissions,
      roleType,
    } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      let p = false;

      user.permissions.forEach((permission) => {
        if (permission === "MANAGE_ACCESS") {
          p = true;
        }
      });

      if (!p) {
        return res.status(400).json({ msg: "No Permission to access" });
      }

      console.log("vivek");

      const newuser = new User({
        firstname,
        lastname,
        role,
        email,
        password,
        permissions,
        roleType,
      });

      const salt = await bcrypt.genSalt(10);

      newuser.password = await bcrypt.hash(password, salt);

      await newuser.save();

      res.status(201).json({ msg: "User Saved" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
