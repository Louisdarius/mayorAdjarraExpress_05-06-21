const Router = require('express').Router(),
  feedbackListController = require('../controllers/feedbackListController');
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

Router.get('/', auth, adminAuth, feedbackListController.getAllFeedbackList);
Router.get('/:id', auth, adminAuth, feedbackListController.getEachFeedbackList);
Router.post('/', auth, adminAuth, feedbackListController.addFeedbackList);
Router.put('/:id', auth, adminAuth, feedbackListController.updateFeedbackList);
Router.delete(
  '/:id',
  auth,
  adminAuth,
  feedbackListController.deleteFeedbackList
);

module.exports = Router;
