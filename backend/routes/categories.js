const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const Categories = require("../models/Categories");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
    try {
        const categories = await Categories.find({
            user: req.user.id,
        }).sort({
            date: -1,
        });
        res.json(categories);
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

        const category = new Categories({
            value,
            user: req.user.id,
        });

        await category.save();

        res.status(200).json({ msg: "Category Saved" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = route;
