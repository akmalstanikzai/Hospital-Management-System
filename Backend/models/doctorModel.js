const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  achievements: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
