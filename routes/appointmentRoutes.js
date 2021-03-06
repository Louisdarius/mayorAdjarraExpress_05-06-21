const Router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const { adminAndReceptAuth } = require('../middleware/adminAuth');

Router.get(
  '/',
  auth,
  adminAndReceptAuth,
  appointmentController.getAllAppointments
);
Router.get('/owner', auth, appointmentController.getAllAppointmentsProfile);
Router.get(
  '/:id',
  auth,
  adminAndReceptAuth,
  appointmentController.getEachAppointment
);
Router.get('/owner/:id', auth, appointmentController.getEachAppointmentProfile);
Router.post('/', auth, appointmentController.addAppointment);
Router.put(
  '/:id',
  auth,
  adminAndReceptAuth,
  appointmentController.updateAppointment
);
Router.put('/owner/:id', auth, appointmentController.updateAppointmentProfile);
Router.delete(
  '/:id',
  auth,
  adminAndReceptAuth,
  appointmentController.deleteAppointment
);
Router.delete(
  '/owner/:id',
  auth,
  appointmentController.deleteAppointmentProfile
);

module.exports = Router;
