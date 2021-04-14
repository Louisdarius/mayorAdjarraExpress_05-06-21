const Router = require('express').Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

Router.get('/', auth, adminAuth, feedbackController.getAllFeedbacks);
Router.get('/owner', auth, feedbackController.getAllFeedbacksProfile);
Router.get('/:id', auth, adminAuth, feedbackController.getEachFeedback);
Router.get('/owner/:id', auth, feedbackController.getEachFeedbackProfile);
Router.post('/', auth, feedbackController.addFeedback);
Router.put('/:id', auth, adminAuth, feedbackController.updateFeedback);
Router.put('/owner/:id', auth, feedbackController.updateFeedbackProfile);
Router.delete('/:id', auth, adminAuth, feedbackController.deleteFeedback);
Router.delete('/owner/:id', auth, feedbackController.deleteFeedbackProfile);

module.exports = Router;
