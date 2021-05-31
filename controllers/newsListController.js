const NewsList = require('../models/newsListModel');

/**
 * Get all newsLists controller
 */
async function getAllNewsList(req, res, next) {
  try {
    const newsLists = await NewsList.find().sort({ createdAt: -1 });
    res.json(newsLists);
  } catch (error) {
    next(error);
  }
}
async function getAllNewsListLimit(req, res, next) {
  try {
    const newsLists = await NewsList.find().sort({ createdAt: -1 }).limit(10);
    res.json(newsLists);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific newsList controller
 */
async function getEachNewsList(req, res, next) {
  try {
    const newsList = await NewsList.findById(req.params.id);
    res.json(newsList);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a newsList controller
 */
async function addNewsList(req, res, next) {
  const newNewsList = new NewsList(req.body);
  try {
    const createdNewsList = await newNewsList.save();
    res.json(createdNewsList);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a newsList controller
 */
async function updateNewsList(req, res, next) {
  try {
    const newsList = await NewsList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(newsList);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a newsList controller
 */
async function deleteNewsList(req, res, next) {
  try {
    const deleteNewsList = await NewsList.findByIdAndRemove(req.params.id);
    res.json({ message: `A ${deleteNewsList.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNewsList,
  getAllNewsListLimit,
  getEachNewsList,
  addNewsList,
  updateNewsList,
  deleteNewsList,
};
