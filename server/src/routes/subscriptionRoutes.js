const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {
  subscribe,
  getMySubscription,
  getAllSubscriptions,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.post(
  "/subscribe/:planId",
  authMiddleware,
  subscribe
);

router.get(
  "/my-subscription",
  authMiddleware,
  getMySubscription
);

router.get(
  "/admin/subscriptions",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllSubscriptions
);

module.exports = router;