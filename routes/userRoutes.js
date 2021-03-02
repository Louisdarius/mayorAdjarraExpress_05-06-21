const Router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

Router.get('/', auth, userController.getAllUsers);
Router.get('/me', auth, userController.getUserProfile);
Router.get('/:id', auth, userController.getEachUser);
Router.post('/', userController.addUser);
Router.post('/login', userController.login);
Router.post('/logout', auth, userController.logout);
Router.post('/logoutAll', auth, userController.logoutAll);
Router.put('/:id', auth, userController.updateUser);
Router.put('/profile/me', auth, userController.updateUserProfile);
Router.delete('/:id', auth, userController.deleteUser);
Router.delete('/profile/me', auth, userController.deleteUserProfile);

module.exports = Router;
