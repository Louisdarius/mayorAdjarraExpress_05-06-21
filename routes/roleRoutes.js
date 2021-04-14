const Router = require('express').Router(),
  roleController = require('../controllers/roleController');
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

Router.get('/', auth, adminAuth, roleController.getAllRoles);
Router.get('/:id', auth, adminAuth, roleController.getEachRole);
Router.post('/', auth, adminAuth, roleController.addRole);
Router.put('/:id', auth, adminAuth, roleController.updateRole);
Router.delete('/:id', auth, adminAuth, roleController.deleteRole);

module.exports = Router;
