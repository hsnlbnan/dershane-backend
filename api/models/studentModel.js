const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "İsim ve Soyisim zorunludur"],
  },
  class_id: {
    type: String,
    required: [true, "Sınıf zorunludur"],
  },
  phone_number: {
    type: String,
    required: [true, "Telefon numarası zorunludur"],
  },
  identity_number: {
    type: String,
    required: [true, "Kimlik numarası zorunludur"],
  },
  address: {
    type: String,
    required: [false, "Adres zorunludur"],
  },
  guardian_name: {
    type: String,
    required: [false, "Veli adı zorunludur"],
  },
  guardian_phone_number: {
    type: String,
    required: [false, "Veli telefon numarası zorunludur"],
  },
  guardian_identity_number: {
    type: String,
    required: [false, "Veli kimlik numarası zorunludur"],
  },
  guardian_address: {
    type: String,
    required: [false, "Veli adresi zorunludur"],
  },

  price: {
    type: Number,
    required: [false, "Ücret zorunludur"],
  },
  payment: {
    type: Number,
    required: [false, "Ödeme zorunludur"],
  },
  debt: {
    type: Number,
    required: [false, "Borç zorunludur"],
  },
  payment_date: {
    type: Date,
    required: [false, "Ödeme tarihi zorunludur"],
  },
  payment_type: {
    type: String,
    required: [false, "Ödeme türü zorunludur"],
  },
  payment_status: {
    type: String,
    required: [false, "Ödeme durumu zorunludur"],
  },
  payment_description: {
    type: String,
    required: [false, "Ödeme açıklaması zorunludur"],
  },
  payment_note: {
    type: String,
    required: [false, "Ödeme notu zorunludur"],
  },
  payment_installment: {
    type: Number,
    required: [false, "Ödeme taksit zorunludur"],
  },
  payment_installment_date: {
    type: Date,
    required: [false, "Ödeme taksit tarihi zorunludur"],
  },
  installments: {
    type: String,
    required: [false, "Taksitler zorunludur"],
  },

  payment_table: {
    type: Array,
    required: [false, "Ödeme tablosu zorunludur"],
  },
});

// create a database Model
const studentModel = mongoose.model("studentdb", studentSchema);
// exports a userModel
module.exports = studentModel;
