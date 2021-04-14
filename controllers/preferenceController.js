const Preference = require('../models/preferenceModel');

/**
 * Get all preferences controller
 */
async function getAllPreferences(req, res, next) {
  try {
    const preferences = await Preference.find();
    res.json(preferences);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific preference controller
 */
async function getEachPreference(req, res, next) {
  try {
    const preference = await Preference.findById(req.params.id);
    res.json(preference);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a preference controller
 */
async function addPreference(req, res, next) {
  const newPreference = new Preference(req.body);
  try {
    const createdPreference = await newPreference.save();
    res.json(createdPreference);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a preference controller
 */
async function updatePreference(req, res, next) {
  try {
    const preference = await Preference.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(preference);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a preference controller
 */
async function deletePreference(req, res, next) {
  try {
    const deletePreference = await Preference.findByIdAndRemove(req.params.id);
    res.json({ message: `A ${deletePreference.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPreferences,
  getEachPreference,
  addPreference,
  updatePreference,
  deletePreference,
};
