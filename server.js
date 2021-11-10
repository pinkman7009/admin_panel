const express = require("express");
const connectDB = require("./backend/config/db");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./backend/config.env" });

const app = express();

connectDB();

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(cors());

app.use("/api/users", require("./backend/routes/users"));
app.use("/api/login", require("./backend/routes/login"));
app.use("/api/categories", require("./backend/routes/categories"));
app.use("/api/news", require("./backend/routes/news"));
app.use("/api/subcategories", require("./backend/routes/subcategories"));
app.use("/api/plans", require("./backend/routes/plan"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
