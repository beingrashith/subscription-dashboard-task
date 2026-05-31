require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./src/routes/authRoutes");
const planRoutes = require("./src/routes/planRoutes");
const subscriptionRoutes =
  require("./src/routes/subscriptionRoutes");

// Middleware FIRST
app.use(cors());
app.use(express.json());
app.use("/api/plans", planRoutes);
app.use("/api", subscriptionRoutes);

// Routes AFTER middleware
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });