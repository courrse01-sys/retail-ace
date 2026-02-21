const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getDailySales,
} = require("../controllers/analyticsController");

router.get("/dashboard", getDashboardStats);
router.get("/daily-sales", getDailySales);

module.exports = router;
