const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stdModel = require("../models/studentModel");
const installmentModel = require("../models/installmentModel");
const addStudentController = async (req, res) => {
  const {
    name,
    class_id,
    phone_number,
    identity_number,
    address,
    guardian_name,
    guardian_phone_number,
    guardian_identity_number,
    guardian_address,
    price,
    payment,
    debt,
    payment_date,
    payment_type,
    installments,
  } = req.body;
  try {
    const exitingStudent = await stdModel.findOne({ identity_number });
    if (exitingStudent) {
      return res.status(400).json({ message: "Bu öğrenci zaten kayıtlı" });
    }

    if (class_id) {
      // if class_id is not null, then add student to class
      const classModel = require("../models/classModel");
      const classData = await classModel.findById(class_id);
      const students = classData.students;
      students.push({
        name,
        identity_number,
        phone_number,
      });
    }

    const result = await stdModel.create({
      name,
      class_id,
      phone_number,
      identity_number,
      address,
      guardian_name,
      guardian_phone_number,
      guardian_identity_number,
      guardian_address,
      price,
      payment,
      debt,
      payment_date,
      payment_type,
      installments,
    });

    const amount = price - payment;
    const payment_installment = amount / installments;
    let installment_date = new Date(payment_date);
    let installments_array = [];

    for (let i = 1; i <= installments; i++) {
      const installment = {
        student_id: result._id,
        installment_number: i,
        installment_amount: payment_installment,
        installment_status: "bekleniyor",
        installment_date: new Date(
          installment_date.getFullYear(),
          installment_date.getMonth() + i,
          installment_date.getDate()
        ),
      };

      if (installment_date.getTime() < new Date().getTime()) {
        installment.installment_status = "gecikti";
      }

      installments_array.push(installment);
    }

    await installmentModel.insertMany(installments_array);

    res.status(201).json({
      message: "Öğrenci başarıyla eklendi",
      data: {
        ...result,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const updateStudentController = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    class_id,
    phone_number,
    identity_number,
    address,
    guardian_name,
    guardian_phone_number,
    guardian_identity_number,
    guardian_address,
    price,
    payment,
    debt,
    payment_date,
    payment_type,
    installments,
  } = req.body;

  try {
    const student = await stdModel.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Öğrenci bulunamadı" });
    }

    // update the student data
    student.name = name;
    student.class_id = class_id;
    student.phone_number = phone_number;
    student.identity_number = identity_number;
    student.address = address;
    student.guardian_name = guardian_name;
    student.guardian_phone_number = guardian_phone_number;
    student.guardian_identity_number = guardian_identity_number;
    student.guardian_address = guardian_address;
    student.price = price;
    student.payment = payment;
    student.debt = debt;
    student.payment_date = payment_date;
    student.payment_type = payment_type;
    student.installments = installments;

    await student.save();

    // update class data if necessary
    if (class_id) {
      const classModel = require("../models/classModel");
      const classData = await classModel.findById(class_id);
      const students = classData.students;
      const existingStudent = students.find((s) => s._id.equals(id));
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.identity_number = identity_number;
        existingStudent.phone_number = phone_number;
      } else {
        students.push({
          _id: id,
          name,
          identity_number,
          phone_number,
        });
      }
      await classData.save();
    }

    res.status(200).json({
      message: "Öğrenci başarıyla güncellendi",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const getAllStudentsController = async (req, res) => {
  try {
    const result = await stdModel.find();
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getStudentByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await stdModel.findById(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const deleteStudentController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await stdModel.findByIdAndDelete(id);
    await deletePaymentsByStudentId(id);

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const deletePaymentsByStudentId = async (studentId) => {
  try {
    const result = await installmentModel.deleteMany({ student_id: studentId });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getStudentInstallments = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await installmentModel.find({ student_id: id });
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const doPaymentByInstallmentId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await installmentModel.findByIdAndUpdate(id, {
      payment_status: "odendi",
    });
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const undoPaymentByInstallmentId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await installmentModel.findByIdAndUpdate(id, {
      payment_status: "bekleniyor",
    });
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  addStudentController,
  updateStudentController,
  getAllStudentsController,
  deleteStudentController,
  getStudentByIdController,

  getStudentInstallments,
  doPaymentByInstallmentId,
  undoPaymentByInstallmentId,
};
