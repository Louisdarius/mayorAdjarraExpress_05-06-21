const Router = require('express').Router(),
  preferenceController = require('../controllers/preferenceController');
const auth = require('../middleware/auth');
const { adminAndReceptAuth, adminAuth } = require('../middleware/adminAuth');

Router.get(
  '/',
  auth,
  adminAndReceptAuth,
  preferenceController.getAllPreferences
);
Router.get(
  '/:id',
  auth,
  adminAndReceptAuth,
  preferenceController.getEachPreference
);
Router.post('/', auth, adminAndReceptAuth, preferenceController.addPreference);
Router.put(
  '/:id',
  auth,
  adminAndReceptAuth,
  preferenceController.updatePreference
);
Router.delete('/:id', auth, adminAuth, preferenceController.deletePreference);

module.exports = Router;
