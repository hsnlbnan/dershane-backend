const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "İsim ve Soyisim zorunludur"],
  },
  jobTitle: {
    type: String,
    required: [true, "İş unvanı zorunludur"],
  },

  email: {
    type: String,
    required: [true, "E-Posta zorunludur"],
  },
  password: {
    type: String,
    required: [true, "Şifre zorunludur"],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },

  notification: {
    type: Array,
    dafault: [],
  },
  SeenNotification: {
    type: Array,
    dafault: [],
  },
});

const adminModel = mongoose.model("AdminDB", AdminSchema);
module.exports = adminModel;
