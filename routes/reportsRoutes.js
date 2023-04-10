const express = require("express");
const {
  reportInstallementForMonth,
  getUpcomingToThreeStudent,
} = require("../controllers/PaymentController");
const authMiddleware = require("../midlewares/authMiddleware");

const router = express.Router();

router.get("/report", authMiddleware, reportInstallementForMonth);
router.get("/upcoming", authMiddleware, getUpcomingToThreeStudent);

module.exports = router;
