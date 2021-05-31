const Router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { adminAndReceptAuth, adminAuth } = require('../middleware/adminAuth');
const multer = require('multer');
var upload = multer({
  //limits: {
  //fieldSize: 1,
  //},
});

Router.get('/', userController.getAllUsers);
Router.get('/me', auth, userController.getUserProfile);
Router.get('/:id', auth, adminAndReceptAuth, userController.getEachUser);
Router.get('/image/me', auth, userController.getImage);
Router.post('/', userController.addUser);
Router.post('/login', userController.login);
Router.post('/sendEmail', userController.sendEmail);
Router.post('/sendCode', userController.sendCode);
Router.post('/changeUserPassword/:id', userController.changeUserPassword);
Router.post(
  '/changeUserProfilePassword',
  auth,
  userController.changeUserProfilePassword
);
Router.post('/logout', auth, userController.logout);
Router.post('/logoutAll', auth, userController.logoutAll);
Router.put('/:id', auth, adminAndReceptAuth, userController.updateUser);
Router.put('/profile/me', auth, userController.updateUserProfile);
Router.put(
  '/profile/photo/me',
  upload.single('image'),
  auth,
  userController.uploadImage
);
Router.delete('/:id', auth, adminAuth, userController.deleteUser);
Router.delete('/profile/me', auth, userController.deleteUserProfile);

module.exports = Router;
