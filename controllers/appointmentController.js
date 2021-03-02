const Appointment = require('../models/appointmentModel');

/**
 * Gett all appointments controller
 */
async function getAllAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find().populate('user');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
}

async function getAllAppointmentsProfile(req, res, next) {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    }).populate('user');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific  appointment controller
 */
async function getEachAppointment(req, res, next) {
  try {
    const _id = req.params.id;
    const appointment = await Appointment.findOne({
      _id,
      user: req.user._id,
    }).populate('user');
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

async function getEachAppointmentProfile(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      'user'
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a appointment controller
 */
async function addAppointment(req, res, next) {
  const newAppointment = new Appointment({ ...req.body, user: req.user._id });
  try {
    const createdAppointment = await newAppointment.save();
    await createdAppointment.populate('user').execPopulate();
    res.json(createdAppointment);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a appointment controller
 */
async function updateAppointment(req, res, next) {
  try {
    const updatePatient = await Appointment.findById(req.params.id);
    (updatePatient.description = req.body.description),
      (updatePatient.status = req.body.status),
      (updatePatient.date = req.body.date),
      (updatePatient.time = req.body.time),
      (updatePatient.adminUser = updatePatient.adminUser.concat({
        notes: req.body.notes,
        user: req.user._id,
      }));
    const patient = await updatePatient.save();
    await patient.populate('user').execPopulate();
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

async function updateAppointmentProfile(req, res, next) {
  try {
    const updatePatient = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    (updatePatient.description = req.body.description),
      (updatePatient.status = req.body.status),
      (updatePatient.date = req.body.date),
      (updatePatient.time = req.body.time),
      (updatePatient.adminUser = updatePatient.adminUser.concat({
        notes: req.body.notes,
        user: req.user._id,
      }));
    const patient = await updatePatient.save();
    await patient.populate('user').execPopulate();
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a appointment controller
 */
async function deleteAppointment(req, res, next) {
  try {
    const deleteAppointment = await Appointment.findByIdAndRemove(
      req.params.id
    );
    res.json({ message: `A ${deleteAppointment.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

async function deleteAppointmentProfile(req, res, next) {
  try {
    const deleteAppointment = await Appointment.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ message: `A ${deleteAppointment.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAppointments,
  getEachAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getEachAppointmentProfile,
  getAllAppointmentsProfile,
  updateAppointmentProfile,
  deleteAppointmentProfile,
};
