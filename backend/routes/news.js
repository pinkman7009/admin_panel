const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const News = require("../models/News");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const p = false;

        if (
            user.permissions.forEach((permission) => {
                if (permission === "NEWS") {
                    p = true;
                }
            })
        )
            if (!p) {
                return res.status(400).json({ msg: "No Permission to access" });
            }

        const news = await News.find().sort({
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

        const { title, desc, desc2 } = req.body;

        try {
            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            const role = user.role;

            if (role !== 0) {
                return res.status(401).json({ msg: "Not Authorised" });
            }
            const p = false;

            if (
                user.permissions.forEach((permission) => {
                    if (permission === "NEWS") {
                        p = true;
                    }
                })
            )
                if (!p) {
                    return res
                        .status(400)
                        .json({ msg: "No Permission to access" });
                }

            const news = new News({
                title,
                desc,
                dec2,
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
        const p = false;

        if (
            user.permissions.forEach((permission) => {
                if (permission === "NEWS") {
                    p = true;
                }
            })
        )
            if (!p) {
                return res.status(400).json({ msg: "No Permission to access" });
            }

        const news = await News.findById(req.params.id);

        news.title = req.body.title || news.title;
        news.desc = req.body.desc || news.desc;
        news.desc2 = req.body.desc2 || news.desc2;

        await news.save();

        res.status(200).json({ msg: "News Updated" });
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
        const p = false;

        if (
            user.permissions.forEach((permission) => {
                if (permission === "NEWS") {
                    p = true;
                }
            })
        )
            if (!p) {
                return res.status(400).json({ msg: "No Permission to access" });
            }

        await News.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: "News Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = route;
