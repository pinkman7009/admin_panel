const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const auth = require("../middleware/auth");

route.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    let p = false;

    // if (
    //     user.permissions.forEach((permission) => {
    //         if (permission === "MEMBERSHIP_PLAN") {
    //             p = true;
    //         }
    //     })
    // )
    //     if (!p) {
    //         return res.status(400).json({ msg: "No Permission to access" });
    //     }

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
      let p = false;

      user.permissions.forEach((permission) => {
        if (permission === "MEMBERSHIP_PLAN") {
          p = true;
        }
      });

      if (!p) {
        return res.status(400).json({ msg: "No Permission to access" });
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
      if (permission === "MEMBERSHIP_PLAN") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    const plans = await Plan.findById(req.params.id);

    plans.name = req.body.name || plans.name;
    plans.price = req.body.price || plans.price;

    await plans.save();

    res.status(200).json({ msg: "Plans Updated" });
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
      if (permission === "MEMBERSHIP_PLAN") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    await Plan.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Plan Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = route;
