const Feedback = require('../models/feedbackModel');

/**
 * Gett all feedbacks controller
 */
async function getAllFeedbacks(req, res, next) {
  try {
    const { status = null } = req.query;
    // Build DB query
    let query = {};

    if (status) {
      query = {
        $or: [{ status: new RegExp(status, 'gi') }],
      };
    }

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'status firstName lastName');
    res.json({ feedbacks });
  } catch (error) {
    next(error);
  }
}

async function getAllFeedbacksProfile(req, res, next) {
  try {
    const feedbacks = await Feedback.find({
      user: req.user._id,
    });
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific  feedback controller
 */

async function getEachFeedback(req, res, next) {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      'user',
      'status firstName lastName'
    );
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

async function getEachFeedbackProfile(req, res, next) {
  try {
    const _id = req.params.id;
    const feedback = await Feedback.findOne({
      _id,
      user: req.user._id,
    });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a feedback controller
 */
async function addFeedback(req, res, next) {
  const newFeedback = new Feedback({ ...req.body, user: req.user._id });
  try {
    const createdFeedback = await newFeedback.save();
    await createdFeedback.populate('user', 'firstName lastName').execPopulate();
    res.json(createdFeedback);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a feedback controller
 */
async function updateFeedback(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await feedback.populate('user', 'status firstName lastName').execPopulate();
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

async function updateFeedbackProfile(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await feedback.populate('user', 'firstName lastName').execPopulate();
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a feedback controller
 */
async function deleteFeedback(req, res, next) {
  try {
    const deleteFeedback = await Feedback.findByIdAndRemove(req.params.id);
    res.json({ message: `A ${deleteFeedback.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

async function deleteFeedbackProfile(req, res, next) {
  try {
    const deleteFeedback = await Feedback.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ message: `A ${deleteFeedback.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFeedbacks,
  getEachFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getEachFeedbackProfile,
  getAllFeedbacksProfile,
  updateFeedbackProfile,
  deleteFeedbackProfile,
};
