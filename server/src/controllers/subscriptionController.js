const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

exports.subscribe = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        error: "Plan not found",
      });
    }

    const startDate = new Date();

    const endDate = new Date();

    endDate.setDate(endDate.getDate() + plan.duration);

    const subscription = await Subscription.create({
      userId: req.user.userId,
      planId: plan._id,
      startDate,
      endDate,
      status: "ACTIVE",
    });

    const existing = await Subscription.findOne({
      userId: req.user.userId,
      status: "ACTIVE",
    });

    if (existing) {
      return res.status(400).json({
        error: "Active subscription already exists",
      });
    }

    res.status(201).json({
      message: "Subscription created",
      subscription,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.userId,
      status: "ACTIVE",
    }).populate("planId");

    if (!subscription) {
      return res.status(404).json({
        error: "No active subscription",
      });
    }

    res.json(subscription);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("userId", "name email")
      .populate("planId");

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
