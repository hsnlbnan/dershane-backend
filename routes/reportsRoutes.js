const express = require("express");
const {
  reportInstallementForMonth,
  getUpcomingToThreeStudent,
} = require("../controllers/PaymentController");
const authMiddleware = require("../midlewares/authMiddleware");

const router = express.Router();

router.get("/report", reportInstallementForMonth);
router.get("/upcoming", getUpcomingToThreeStudent);

module.exports = router;
