const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} = require('../controllers/appointmentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require auth for all appointment routes
router.use(requireAuth);

// GET all appointments
router.get('/', getAppointments);

// GET a single appointment
router.get('/:id', getAppointment);

// POST a new appointment
router.post('/', createAppointment);

// DELETE an appointment
router.delete('/:id', deleteAppointment);

// UPDATE an appointment
router.patch('/:id', updateAppointment);

module.exports = router;
