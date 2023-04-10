const express = require("express");
const {
  adminLoginController,
  adminRegisterController,
  AuthControllers,
  adminLogoutController,

  createClassController,
  getClassesController,
  updateClassController,
  deleteClassController,
  getAllClassesController,

  addStudentToClassController,

  removeStudentFromClassController,
  getStudentById,
} = require("../controllers/AdminController");
const authMiddleware = require("../midlewares/authMiddleware");
const router = express.Router();

// Routes
// User Login controller
router.post("/admin-login", adminLoginController);

// User Register Controller

router.post("/admin-register", adminRegisterController);

router.post("admin-logout", adminLogoutController);

// Home page auth Controller
router.post("/setUserData", authMiddleware, AuthControllers);

// get the user Date

//  Delete Student

// getSingle student by email
// update profile

router.post("/create-class", authMiddleware, createClassController);
router.post("/update-class", authMiddleware, updateClassController);
router.post("/delete-class", authMiddleware, deleteClassController);

router.get("/get-classes", authMiddleware, getAllClassesController);

router.post("/get-class-by-id", authMiddleware, getClassesController);

router.post("/addStudentToClass", authMiddleware, addStudentToClassController);
router.post(
  "/removeStudentFromClass",
  authMiddleware,
  removeStudentFromClassController
);
router.post("/getStudentById", authMiddleware, getStudentById);

module.exports = router;
