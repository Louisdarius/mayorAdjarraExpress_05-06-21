const Notification = require('../models/notificationModel');

/**
 * Gett all notifications controller
 */
async function getAllNotifications(req, res, next) {
  try {
    const PER_PAGE = 50;
    const { status = null, page = 1 } = req.query;
    // Build DB query
    let query = {};
    if (status) {
      query = {
        $or: [{ status: new RegExp(status, 'gi') }],
      };
    }
    // Count results
    const total = await Notification.countDocuments(query);

    const notifications = await Notification.find(query)
      //.limit(PER_PAGE)
      //.skip((page - 1) * PER_PAGE)
      .sort({ createdAt: -1 })
      .populate('user', 'status firstName lastName');
    res.json({ notifications, page, perPage: PER_PAGE, total });
  } catch (error) {
    next(error);
  }
}

async function getAllNotificationsProfile(req, res, next) {
  try {
    const { status = 'read' } = req.query;
    let query = {};
    if (status) {
      query[`status`] = status;
    }
    const total = await Notification.countDocuments({
      user: req.user._id,
      status: 'unread',
    });
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate('user', 'status firstName lastName');
    res.json({ notifications, total });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific  notification controller
 */

async function getEachNotification(req, res, next) {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      'user',
      'status firstName lastName'
    );
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

async function getEachNotificationProfile(req, res, next) {
  try {
    const _id = req.params.id;
    const notification = await Notification.findOne({
      _id,
      user: req.user._id,
    }).populate('user');
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a notification controller
 */
async function addNotification(req, res, next) {
  const newNotification = new Notification({ ...req.body, user: req.user._id });
  try {
    const createdNotification = await newNotification.save();
    await createdNotification
      .populate('user', 'status firstName lastName')
      .execPopulate();
    res.json(createdNotification);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a notification controller
 */
async function updateNotification(req, res, next) {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    await notification
      .populate('user', 'status firstName lastName')
      .execPopulate();
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

async function updateNotificationProfile(req, res, next) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: 'read',
        },
      },
      { new: true }
    );
    await notification
      .populate('user', 'status firstName lastName')
      .execPopulate();
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a notification controller
 */
async function deleteNotification(req, res, next) {
  try {
    const deleteNotification = await Notification.findByIdAndRemove(
      req.params.id
    );
    res.json({ message: `A ${deleteNotification._id} was deleted` });
  } catch (error) {
    next(error);
  }
}

async function deleteNotificationProfile(req, res, next) {
  try {
    const deleteNotification = await Notification.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ message: `A ${deleteNotification._id} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNotifications,
  getEachNotification,
  addNotification,
  updateNotification,
  deleteNotification,
  getEachNotificationProfile,
  getAllNotificationsProfile,
  updateNotificationProfile,
  deleteNotificationProfile,
};
