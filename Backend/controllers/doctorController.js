const Doctor = require('../models/doctorModel')
const mongoose = require('mongoose')

// get all the profiles
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).sort({ createdAt: -1 });
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a single doctor by ID
const getDoctor = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such doctor' });
    }
  
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ error: 'No such doctor' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Create a new doctor profile
const createDoctor = async (req, res) => {
    const { name, specialty, experience, achievements, timing } = req.body;
  
    let emptyFields = [];
  
    if (!name) {
      emptyFields.push('name');
    }
    if (!specialty) {
      emptyFields.push('specialty');
    }
    if (!experience) {
      emptyFields.push('experience');
    }
    if (!achievements) {
      emptyFields.push('achievements');
    }
    if (!timing){
      emptyFields.push('timing');
    }
  
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
  
    try {
      const doctor = await Doctor.create({ name, specialty, experience, achievements, timing });
      res.status(200).json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
  


// Delete a doctor profile by ID
const deleteDoctor = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such doctor' });
    }
  
    try {
      // Attempt to find and delete the doctor profile by its ID
      const doctor = await Doctor.findOneAndDelete({ _id: id });
  
      // If no doctor profile is found with the given ID, respond with a 400 status and an error message
      if (!doctor) {
        return res.status(400).json({ error: 'No such doctor' });
      }
  
      // If the doctor profile is successfully deleted, respond with a 200 status and the deleted doctor profile
      res.status(200).json(doctor);
    } catch (error) {
      // If an error occurs during the deletion process, respond with a 500 status and the error message
      res.status(500).json({ error: error.message });
    }
};


// Update a doctor profile by ID
const updateDoctor = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such doctor' });
    }
  
    try {
      const doctor = await Doctor.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
      if (!doctor) {
        return res.status(400).json({ error: 'No such doctor' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDoctors,
    getDoctor,
    createDoctor,
    deleteDoctor,
    updateDoctor
};
