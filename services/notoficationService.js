const Notification = require('../models/notificationModel');

module.exports.createNotification = function createNotification({
  navigation,
  action,
  user,
  message,
}) {
  return Notification.create({ navigation, action, user, message });
};
