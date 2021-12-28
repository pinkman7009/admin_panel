const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post(
  "/",
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
      phone,
      categories_permissions,
    } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "Email id already used" });
      }

      user = new User({
        firstname,
        lastname,
        role,
        email,
        password,
        permissions,
        roleType,
        phone,
      });

      if (permissions?.includes("CATEGORIES")) {
        user.categories_permissions = categories_permissions;
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// GET user by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("membership_plan");

    if (!user) {
      res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(err.message);

    res.status(500).send("server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ msg: "No user found" });
    }

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.roleType = req.body.roleType || user.roleType;
    user.permissions = req.body.permissions || user.permissions;
    user.phone = req.body.phone || user.phone;
    user.roleTitle = req.body.roleTitle || user.roleTitle;
    user.categories_permissions =
      req.body.categories_permissions || user.categories_permissions;
    user.membership_plan = req.body.membership_plan || user.membership_plan;

    await user.save();

    res.status(200).json({ msg: "User Updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.put("/block/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    if (user.blockedStatus === false) user.blockedStatus = true;
    else user.blockedStatus = false;

    await user.save();

    res.status(200).json({
      msg: `User Blocked Status is ${user.blockedStatus}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//follow following
router.put("follow/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    const newfollowing = req.body.following;

    const otheruser = await User.findById(newfollowing);

    otheruser.followers = otheruser.followers.push(user._id);

    user.following = user.following.push(newfollowing);

    await user.save();
    await otheruser.save();

    res.status(200).json({ message: "following added" });
  } catch (error) {}
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    res.status(200).json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
