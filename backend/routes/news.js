const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const News = require("../models/News");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
    try {
        const news = await News.find({
            user: req.user.id,
        }).sort({
            date: -1,
        });
        res.json(news);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

route.post(
    "/",
    auth,
    [body("title").not().isEmpty(), body("desc").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, desc } = req.body;

        try {
            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            const role = user.role;

            if (role !== 0) {
                return res.status(401).json({ msg: "Not Authorised" });
            }

            const news = new News({
                title,
                desc,
                user: req.user.id,
            });

            await news.save();

            res.status(200).json(news);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }
    }
);

module.exports = route;
