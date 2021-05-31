const Router = require('express').Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');
const { adminAndReceptAuth } = require('../middleware/adminAuth');

Router.get(
  '/',
  auth,
  adminAndReceptAuth,
  notificationController.getAllNotifications
);
Router.get('/owner', auth, notificationController.getAllNotificationsProfile);
Router.get(
  '/:id',
  auth,
  adminAndReceptAuth,
  notificationController.getEachNotification
);
Router.get(
  '/owner/:id',
  auth,
  notificationController.getEachNotificationProfile
);
Router.post('/', auth, notificationController.addNotification);
Router.put(
  '/:id',
  auth,
  adminAndReceptAuth,
  notificationController.updateNotification
);
Router.put(
  '/owner/:id',
  auth,
  notificationController.updateNotificationProfile
);
Router.delete(
  '/:id',
  auth,
  adminAndReceptAuth,
  notificationController.deleteNotification
);
Router.delete(
  '/owner/:id',
  auth,
  notificationController.deleteNotificationProfile
);

module.exports = Router;
