require("dotenv").config();

const mongoose = require("mongoose");
const Plan = require("./models/Plan");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    await Plan.deleteMany();

    await Plan.insertMany([
      {
        name: "Basic",
        price: 9,
        duration: 30,
        features: [
          "1 User",
          "Email Support"
        ]
      },
      {
        name: "Pro",
        price: 29,
        duration: 30,
        features: [
          "5 Users",
          "Priority Support",
          "Analytics"
        ]
      },
      {
        name: "Business",
        price: 99,
        duration: 30,
        features: [
          "Unlimited Users",
          "Analytics",
          "Dedicated Manager"
        ]
      }
    ]);

    console.log("Plans Seeded");

    process.exit();
  })
  .catch(console.log);