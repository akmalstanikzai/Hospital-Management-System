const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('AppointmentRequest', appointmentRequestSchema);
