const FeedbackList = require('../models/feedbackListModel');

/**
 * Get all feedbackList controller
 */
async function getAllFeedbackList(req, res, next) {
  try {
    const feedbackList = await FeedbackList.find();
    res.json(feedbackList);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific feedbackList controller
 */
async function getEachFeedbackList(req, res, next) {
  try {
    const feedbackList = await FeedbackList.findById(req.params.id);
    res.json(feedbackList);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a feedbackList controller
 */
async function addFeedbackList(req, res, next) {
  const newFeedbackList = new FeedbackList(req.body);
  try {
    const createdFeedbackList = await newFeedbackList.save();
    res.json(createdFeedbackList);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a feedbackList controller
 */
async function updateFeedbackList(req, res, next) {
  try {
    const feedbackList = await FeedbackList.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(feedbackList);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a feedbackList controller
 */
async function deleteFeedbackList(req, res, next) {
  try {
    const deleteFeedbackList = await FeedbackList.findByIdAndRemove(
      req.params.id
    );
    res.json({ message: `A ${deleteFeedbackList.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFeedbackList,
  getEachFeedbackList,
  addFeedbackList,
  updateFeedbackList,
  deleteFeedbackList,
};
