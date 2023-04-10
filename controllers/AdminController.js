const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/AdminModel");
const classModel = require("../models/classModel");
const stdModel = require("../models/studentModel");
// Register Controller
const adminRegisterController = async (req, res) => {
  try {
    const existUser = await adminModel.findOne({ email: req.body.email });
    if (existUser) {
      res.status(201).send({
        success: false,
        message: "User Another email email exists",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new adminModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// admin login controller
const adminLoginController = async (req, res) => {
  console.log(req.body);
  try {
    const user = await adminModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid email or password ",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token);
    console.log("USER", user);

    res.status(200).send({
      success: true,
      message: "Login Successfuly",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "error during login user",
      error,
    });
  }
};
// store student data into studentmodel

// // Auth Controllers to check the user
const AuthControllers = async (req, res) => {
  try {
    const user = await adminModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(401).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(201).send({
        message: "Welcome",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

const adminLogoutController = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Logout failed",
      success: false,
    });
  }
};

const createClassController = async (req, res) => {
  try {
    const name = req.body.name;
    const code = req.body.code;
    const description = req.body.description;

    const newClass = new classModel({
      name,
      code,
      description,
    });
    await newClass.save();
    res.status(201).send({
      success: true,
      message: "Class Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const getClassesController = async (req, res) => {
  try {
    const classId = req.body.id;
    const findedClass = await classModel.findOne({
      _id: classId,
    });

    res.status(200).send({
      success: true,
      message: "Class find Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const updateClassController = async (req, res) => {
  try {
    const classId = req.body.id;
    const findedClass = await classModel.findOne({
      _id: classId,
    });
    findedClass.name = req.body.name;
    findedClass.code = req.body.code;
    findedClass.description = req.body.description;
    await findedClass.save();
    res.status(200).send({
      success: true,
      message: "Class Updated Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const deleteClassController = async (req, res) => {
  try {
    const classId = req.body.id;
    const findedClass = await classModel.findOneAndDelete({
      _id: classId,
    });
    res.status(200).send({
      success: true,
      message: "Class Deleted Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const getAllClassesController = async (req, res) => {
  try {
    const findedClass = await classModel.find();
    res.status(200).send({
      success: true,
      message: "Class find Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const addStudentToClassController = async (req, res) => {
  try {
    const classId = req.body.id;
    const findedClass = await classModel.findOne({
      _id: classId,
    });
    const studentId = req.body.studentId;
    const findedStudent = await stdModel.findOne({
      _id: studentId,
    });
    findedClass.students.push(findedStudent);
    await findedClass.save();
    res.status(200).send({
      success: true,
      message: "Student added to class Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const removeStudentFromClassController = async (req, res) => {
  try {
    //params id is class id
    const classId = req.body.id;

    const findedClass = await classModel.findOne({
      _id: classId,
    });
    const studentId = req.body.studentId;
    const findedStudent = await stdModel.findOne({
      _id: studentId,
    });
    findedClass.students.pull(findedStudent);
    await findedClass.save();
    res.status(200).send({
      success: true,
      message: "Student removed from class Successfuly",
      data: findedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await stdModel.findOne({
      _id: req.body.id,
    });
    // console.log(student);
    res.status(200).send({
      success: true,
      message: "Student find Successfuly",
      data: student,
    });
  } catch (error) {
    console.log(error);

    res.status(401).send({
      message: "Data can't not get",
      success: false,
    });
  }
};

module.exports = {
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
};
