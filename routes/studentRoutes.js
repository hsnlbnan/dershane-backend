const express = require("express");
const {
  addStudentController,
  getAllStudentsController,
  deleteStudentController,
  getStudentByIdController,
  getStudentInstallments,
  doPaymentByInstallmentId,
  undoPaymentByInstallmentId,
  updateStudentController,
} = require("../controllers/StudentController");
const authMiddleware = require("../midlewares/authMiddleware");
const router = express.Router();

// Routes
// User Login controller

router.post("/add-student", authMiddleware, addStudentController);
router.get("/get-all-students", authMiddleware, getAllStudentsController);
router.delete("/delete-student/:id", authMiddleware, deleteStudentController);
router.get("/get-student-by-id/:id", authMiddleware, getStudentByIdController);
router.get(
  "/get-student-installament-by-id/:id",
  authMiddleware,
  getStudentInstallments
);
router.put(
  "/doPaymentByInstallmentId/:id",
  authMiddleware,
  doPaymentByInstallmentId
);

router.put(
  "/undoPaymentByInstallmentId/:id",
  authMiddleware,
  undoPaymentByInstallmentId
);

// Update Student
router.put("/update-student/:id", authMiddleware, updateStudentController);

// Home page auth Controller
// router.post("/setStdData", authMiddleware, StdAuthControllers);

// Get all studentInfo

// router.get("/getStudentInfo", authMiddleware, getStudentInfo);

module.exports = router;
