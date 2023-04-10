const { default: mongoose } = require("mongoose");

const installmentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  installment_number: {
    type: Number,
    required: true,
  },
  installment_amount: {
    type: Number,
    required: true,
  },
  installment_date: {
    type: Date,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["bekleniyor", "odendi", "gecikti"],
    default: "bekleniyor",
  },
});

const installment =
  mongoose.models.installment ||
  mongoose.model("installment", installmentSchema);
module.exports = installment;
