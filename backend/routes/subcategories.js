const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const SubCategories = require("../models/SubCategories");
const User = require("../models/User");
const auth = require("../middleware/auth");

route.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    console.log({ id });

    const subcategories = await SubCategories.find({
      category: id,
    }).sort({
      date: -1,
    });
    res.json(subcategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

route.post("/", auth, [body("value").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { value, category } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }

    const subcategory = new SubCategories(req.body);

    await subcategory.save();

    res.status(200).json({ msg: "SubCategory Saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = route;
