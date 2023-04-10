const { default: mongoose } = require("mongoose");
const installment = require("../models/installmentModel");
const studentModel = require("../models/studentModel");
const classModel = require("../models/classModel");
const installmentModel = require("../models/installmentModel");

const getInstallments = async (req, res) => {
  try {
    const result = await installment.find();
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getInstallment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await installment.findById(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const reportInstallementForMonth = async (req, res) => {
  try {
    const waitingData = {
      name: "Waiting",
      data: Array(12).fill(0),
    };
    const paidData = {
      name: "Paid",
      data: Array(12).fill(0),
    };
    const result = await installment.find();

    result.forEach((item) => {
      const date = new Date(item.installment_date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const today = new Date();
      const installmentAmount = item.installment_amount;

      if (year === today.getFullYear()) {
        if (month === today.getMonth() && item.payment_status === "odendi") {
          paidData.data[month] += installmentAmount;
        } else if (
          month === today.getMonth() &&
          item.payment_status === "bekleniyor"
        ) {
          waitingData.data[month] += installmentAmount;
        } else if (item.payment_status === "odendi") {
          paidData.data[month] += installmentAmount;
        } else if (item.payment_status === "bekleniyor") {
          waitingData.data[month] += installmentAmount;
        }
      }
    });

    const chartData = [waitingData, paidData];

    res.status(200).json(chartData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getUpcomingToThreeStudent = async (req, res) => {
  try {
    const result = await installment.find();
    console.log(result);
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const filteredResult = result.filter(
      (item) =>
        new Date(item.installment_date) >= today &&
        new Date(item.installment_date) <= nextMonth &&
        item.payment_status === "bekleniyor"
    );

    // find student name
    const studentIds = filteredResult.map((item) => item.student_id);
    const students = await studentModel.find({ _id: { $in: studentIds } });

    const totalInstallments = await Promise.all(
      studentIds.map(async (id) => {
        const installments = await installmentModel.find({ student_id: id });
        return installments.length;
      })
    );

    const classIds = students.map((student) => student.class_id);
    const classes = await classModel.find({ _id: { $in: classIds } });

    filteredResult.forEach((item, index) => {
      const student = students.find((student) =>
        student._id.equals(item.student_id)
      );

      const clazz = classes.find((clazz) => clazz._id.equals(student.class_id));

      filteredResult[index] = {
        ...item._doc,
        student_name: student ? student.name : "Unknown",
        class_name: clazz ? clazz.name : "Unknown",
        total_installment: totalInstallments[index],
      };
    });

    res.status(200).json({ data: filteredResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getInstallments,
  getInstallment,
  reportInstallementForMonth,
  getUpcomingToThreeStudent,
};
