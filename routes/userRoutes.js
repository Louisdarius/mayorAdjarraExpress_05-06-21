const Router = require('express').Router();
const userController = require('../controllers/userController');

Router.get('/', userController.getUsers);
Router.get(':id', userController.getUser);
Router.post('/', userController.addUser);
Router.put('/:id', userController.updateUser);
Router.delete('/:id', userController.deleteUser);

module.exports = Router;
