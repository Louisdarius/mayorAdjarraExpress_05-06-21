const Router = require('express').Router(),
  roleController = require('../controllers/roleController');

Router.get('/', roleController.getAllRoles);
Router.get('/:id', roleController.getEachRole);
Router.post('/', roleController.addRole);
Router.put('/:id', roleController.updateRole);
Router.delete('/:id', roleController.deleteRole);

module.exports = Router;
