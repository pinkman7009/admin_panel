const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const plans = await Plan.find().sort({
            date: -1,
        });
        res.json(plans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

route.post(
    "/",
    auth,
    [body("name").not().isEmpty(), body("price").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price } = req.body;

        try {
            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }

            const role = user.role;

            if (role !== 0) {
                return res.status(401).json({ msg: "Not Authorised" });
            }

            const plan = new Plan({
                name,
                price,
            });

            await plan.save();

            res.status(201).json({ msg: "Plan Saved" });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }
    }
);

module.exports = route;
