const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const Channel = require("../models/Channel");
const auth = require("../middleware/auth");

// Get all channels
route.get("/", auth, async (req, res) => {
  try {
    const channels = await Channel.find()
      .sort({
        date: -1,
      })
      .populate("user");
    res.json(channels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Get channels by User ID
route.get("/userId/:id", auth, async (req, res) => {
  try {
    const channels = await Channel.find({ user: req.params.id });
    res.json(channels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Get channel by ID
route.get("/:id", auth, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("user");

    if (!channel) {
      res.status(404).json({ msg: "Channel does not exist" });
    }

    res.json(channel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Create a channel
route.post("/", auth, [body("name").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const channel = new Channel({
      name,
      user: req.user.id,
    });

    await channel.save();

    res.status(201).json({ msg: "Channel created", data: channel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

// Subscribe to a channel
route.put("/subscribe/:id", auth, async (req, res) => {
  try {
    let channel = await Channel.findById(req.params.id);

    if (!channel) {
      res.status(404).json({ msg: "Channel does not exist" });
    }

    // If user has already subscribed the channel, then unsubscribe
    if (channel.subscribers?.includes(req.user.id)) {
      channel.subscribers = channel.subscribers.filter(
        (item) => item !== req.user.id
      );
    } else {
      // Subscribe the channel
      channel.subscribers = [...channel.subscribers, req.user.id];
    }

    await channel.save();

    res
      .status(200)
      .json({ msg: "Channel Subscription Updated", data: channel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

// Update a channel
route.put("/:id", auth, async (req, res) => {
  try {
    let channel = await Channel.findById(req.params.id);

    if (!channel) {
      res.status(404).json({ msg: "Channel does not exist" });
    }

    channel.name = req.body.name || channel.name;

    // If video is uploaded
    if (req.body.video) {
      channel.videos = [...channel.videos, req.body.video];
    }

    await channel.save();

    res.status(200).json({ msg: "Channel updated", data: channel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

// Delete a channel
route.delete("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await Channel.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Channel Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = route;
