const Appointment = require('../models/appointmentModel');

/**
 * Gett all appointments controller
 */
async function getAllAppointments(req, res, next) {
  try {
    const PER_PAGE = 50;
    const { filter, status = null, meetingPref = null, page = 1 } = req.query;
    // Build DB query
    let query = {};

    if (filter) {
      query = {
        $or: [{ user: new RegExp(filter, 'gi') }],
      };
    }
    if (status) {
      query = {
        $or: [{ status: new RegExp(status, 'gi') }],
      };
    }
    if (meetingPref) {
      query = {
        $or: [{ meetingPref: new RegExp(meetingPref, 'gi') }],
      };
    }
    // Count results
    const total = await Appointment.countDocuments(query);

    const appointments = await Appointment.find(query)
      //.limit(PER_PAGE)
      //.skip((page - 1) * PER_PAGE)
      .sort({ date: -1 })
      .populate('user adminUser.user', 'status firstName lastName');
    res.json({ appointments, page, perPage: PER_PAGE, total });
  } catch (error) {
    next(error);
  }
}

async function getAllAppointmentsProfile(req, res, next) {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    }).populate('user adminUser.user', 'status firstName lastName');
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
    const appointment = await Appointment.findById(req.params.id).populate(
      'user adminUser.user',
      'status firstName lastName'
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

async function getEachAppointmentProfile(req, res, next) {
  try {
    const _id = req.params.id;
    const appointment = await Appointment.findOne({
      _id,
      user: req.user._id,
    }).populate('user adminUser.user');
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
    await createdAppointment
      .populate('user adminUser.user', 'status firstName lastName')
      .execPopulate();
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
    const appointmentUpdate = await Appointment.findOne({
      _id: req.params.id,
    });

    req.body.adminUser = appointmentUpdate.adminUser.concat({
      user: req.user._id,
    });
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    await appointment
      .populate('user adminUser.user', 'status firstName lastName')
      .execPopulate();
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

async function updateAppointmentProfile(req, res, next) {
  try {
    const appointmentUpdate = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    req.body.adminUser = appointmentUpdate.adminUser.concat({
      user: req.user._id,
    });

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    await appointment
      .populate('user adminUser.user', 'status firstName lastName')
      .execPopulate();
    res.json(appointment);
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
