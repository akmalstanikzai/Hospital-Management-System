const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  deleteDoctor,
  updateDoctor,
} = require('../controllers/doctorController'); 
const requireAuth = require('../middleware/requireAuth'); 

const router = express.Router();

// Require authentication for all doctor routes
router.use(requireAuth);

// GET all doctors
router.get('/', getDoctors);

// GET a single doctor
router.get('/:id', getDoctor);

// POST a new doctor
router.post('/', createDoctor);

// DELETE a doctor
router.delete('/:id', deleteDoctor);

// UPDATE a doctor
router.patch('/:id', updateDoctor);

module.exports = router;
