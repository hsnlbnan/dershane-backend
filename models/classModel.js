const mongoose = require("mongoose");

const ClassModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },

  teacher: {
    type: String,
    required: false,
  },
  students: {
    type: Array,
    required: false,
  },
  assignments: {
    type: Array,
    required: false,
  },
});

const classModel = mongoose.models.class || mongoose.model("class", ClassModel);
module.exports = classModel;
