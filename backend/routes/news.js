const express = require("express");
const { body, validationResult } = require("express-validator");
const route = express.Router();
const User = require("../models/User");
const News = require("../models/News");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

// Get all news
route.get("/", async (req, res) => {
  try {
    const news = await News.find()
      .sort({
        date: -1,
      })
      .populate("category")
      .populate("user");

    const newsList = news.map((newsItem) => {
      let likedByUser;
      if (req.query?.userId)
        likedByUser = newsItem.likes.includes(req.query?.userId);
      else likedByUser = false;

      return {
        ...newsItem._doc,
        likedByUser,
      };
    });
    res.json(newsList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// Get news by ID
route.get("/:id", async (req, res) => {
  try {
    let news = await News.findById(req.params.id).populate("category");

    if (!news) {
      res.status(400).json({ message: "News does not exist" });
    }
    let likedByUser;
    if (req.query?.userId) likedByUser = news.likes.includes(req.query?.userId);
    else likedByUser = false;

    res.json({ news, likedByUser });
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

    const { title, desc, desc2, country, city, state, category, author, tags } =
      req.body;

    try {
      const user = await User.findById(req.user.id)
        .select("-password")
        .populate({
          path: "categories_permissions",
          populate: {
            path: "category",
          },
        });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      const role = user.role;

      // if (role !== 0) {
      //   return res.status(401).json({ msg: "Not Authorised" });
      // }

      let status = "Pending";

      if (role === 0) {
        let p = false;

        user.permissions.forEach((permission) => {
          if (permission === "NEWS") {
            p = true;
          }
        });

        if (!p) {
          return res.status(400).json({ msg: "No Permission to access" });
        }

        user.categories_permissions.forEach((cat_p) => {
          if (cat_p.category.value === category) {
            p === true;
          }
        });

        if (!p) {
          return res.status(400).json({
            msg: "Cannot post news with this category",
          });
        }

        // status = "Accepted";
      }

      const news = new News({
        title,
        desc,
        desc2,
        country,
        city,
        state,
        category,
        author,
        user: req.user.id,
        status,
        tags,
      });

      await news.save();

      res.status(200).json(news);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

// Route for likes
route.put("/like/:id", auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        msg: "News with this ID not found",
      });
    }

    // If user has already liked the news, then dislike
    if (news.likes?.includes(req.user.id)) {
      news.likes = news.likes.filter((item) => item !== req.user.id);
    } else {
      // Like the news
      news.likes = [...news.likes, req.user.id];
    }

    await news.save();

    res.status(200).json({
      msg: "Likes updated",
      likesCount: news.likes.length,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

// Route for comments
route.put("/comment/:id", auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        msg: "News with this ID not found",
      });
    }
    // Comment on the news

    req.body.user = req.user.id;

    const comment = await Comment.create(req.body);

    news.comments = [...news.comments, comment];

    await news.save();

    res.status(200).json({
      msg: "Comment added",
      comment,
      commentCount: news.comments.length,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

route.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate({
        path: "categories_permissions",
        populate: {
          path: "category",
        },
      });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "NEWS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    user.categories_permissions.forEach((cat_p) => {
      if (cat_p.category.value === req.body.category) {
        p === true;
      }
    });

    if (!p) {
      return res.status(400).json({
        msg: "Cannot update news with this category",
      });
    }

    const news = await News.findById(req.params.id).populate("user");

    if (!news) {
      return res.status(404).json({
        msg: "News with this ID not found",
      });
    }

    news.title = req.body.title || news.title;
    news.desc = req.body.desc || news.desc;
    news.desc2 = req.body.desc2 || news.desc2;
    news.country = req.body.country || news.country;
    news.city = req.body.city || news.city;
    news.state = req.body.state || news.state;
    news.category = req.body.category || news.category;
    news.author = req.body.author || news.author;

    if (req.body.status) {
      let p = false;

      user.permissions.forEach((permission) => {
        if (permission === "NEWS_APPROVAL") {
          p = true;
        }
      });

      if (!p) {
        return res.status(400).json({ msg: "No Permission to access" });
      }

      if (news.user.role === 0) {
        if (user.isSuperAdmin) news.status = req.body.status || news.status;
        else {
          return res.status(401).json({
            msg: "Only super admin can update news status of Admins",
          });
        }
      } else {
        if (user.role === 0) news.status = req.body.status || news.status;
        else {
          return res.status(401).json({
            msg: "Cannot update news status",
          });
        }
      }
    }

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
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate({
        path: "categories_permissions",
        populate: {
          path: "category",
        },
      });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    let role = user.role;

    if (role !== 0) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    let p = false;

    user.permissions.forEach((permission) => {
      if (permission === "NEWS") {
        p = true;
      }
    });

    if (!p) {
      return res.status(400).json({ msg: "No Permission to access" });
    }

    user.categories_permissions.forEach((cat_p) => {
      if (cat_p.category.value === req.params.id) {
        p === true;
      }
    });

    if (!p) {
      return res.status(400).json({
        msg: "Cannot delete news with this category",
      });
    }

    await News.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "News Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = route;
