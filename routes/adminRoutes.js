const express = require("express");
const {
  adminRegisterController,
  adminLoginController,
  AuthControllers,
  StudentRegisterController,
  getStudentInfo,
  DeleteStdProfileController,
  getStudentInfoController,
  getUpdateProfileController,
  adminLogoutController,
  createClassController,
  getClassesController,
  addStudentToClassController,
  removeStudentFromClassController,
  getStudentById,
  getAllClassesController,
  deleteClassController,
  updateClassController,
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
router.post("/setStudentdata", authMiddleware, StudentRegisterController);

router.get("/getStudentInfo", authMiddleware, getStudentInfo);

//  Delete Student
router.post("/DeleteStdprofile", authMiddleware, DeleteStdProfileController);

// getSingle student by email
router.post("/getStudentInfo", authMiddleware, getStudentInfoController);
// update profile
router.post("/updateProfile", authMiddleware, getUpdateProfileController);

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
