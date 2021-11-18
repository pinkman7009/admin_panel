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
        } = req.body;
        try {
            let user = await User.findOne({ email });

            if (!user) {
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
            });

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

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        res.status(200).json({ msg: "User Updated" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
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
