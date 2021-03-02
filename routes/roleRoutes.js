const Router = require('express').Router(),
  roleController = require('../controllers/roleController');
const auth = require('../middleware/auth');

Router.get('/', auth, roleController.getAllRoles);
Router.get('/:id', auth, roleController.getEachRole);
Router.post('/', auth, roleController.addRole);
Router.put('/:id', auth, roleController.updateRole);
Router.delete('/:id', auth, roleController.deleteRole);

module.exports = Router;
