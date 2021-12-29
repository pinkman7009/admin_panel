const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const Categories = require("../models/Categories");
const auth = require("../middleware/auth");

// Get all categories
route.get("/", async (req, res) => {
  try {
    const categories = await Categories.find().sort({
      date: -1,
    });

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Get category by ID
route.get("/:id", async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (!category) {
      res.status(400).json({ message: "Category does not exist" });
    }
    res.json(category);
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

  const { value } = req.body;

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
      if (permission === "CATEGORIES") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    const category = new Categories({
      value,
    });

    await category.save();

    res.status(200).json({ msg: "Category Saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
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
      if (permission === "CATEGORIES") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    user.categories_permissions.forEach((cat_p) => {
      if (cat_p.category === req.params.id) {
        p === true;
      }
    });

    if (!p) {
      return res
        .status(400)
        .json({ msg: "No permission for editing or deleting this category" });
    }

    const category = await Categories.findById(req.params.id);

    category.value = req.body.value || category.value;

    await category.save();

    res.status(200).json({ msg: "Category Saved" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

route.delete("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
      if (permission === "CATEGORIES") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    user.categories_permissions.forEach((cat_p) => {
      if (cat_p.category === req.params.id) {
        p === true;
      }
    });

    if (!p) {
      return res
        .status(400)
        .json({ msg: "No permission for editing or deleting this category" });
    }

    await Categories.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Category Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = route;
