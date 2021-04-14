const Router = require('express').Router(),
  newsListController = require('../controllers/newsListController');
const auth = require('../middleware/auth');
const { adminAndReceptAuth } = require('../middleware/adminAuth');

Router.get('/', auth, newsListController.getAllNewsList);
Router.get('/limit', auth, newsListController.getAllNewsListLimit);
Router.get('/:id', auth, newsListController.getEachNewsList);
Router.post('/', auth, adminAndReceptAuth, newsListController.addNewsList);
Router.put('/:id', auth, adminAndReceptAuth, newsListController.updateNewsList);
Router.delete(
  '/:id',
  auth,
  adminAndReceptAuth,
  newsListController.deleteNewsList
);

module.exports = Router;
