/**
 * New Auth Middleware
 * Checks for valid Admin user
 */
const adminAuth = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (userRole != '6027daf9b6edc45418dff4db') {
      return res.status(404).send('Only admin user allow');
    }
    next();
  } catch (error) {
    next(error);
  }
};

const adminAndReceptAuth = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (
      userRole != '6027daf9b6edc45418dff4db' &&
      userRole != '6027df2ab306664888a7f86d'
    ) {
      return res.status(404).send('Only admin and reception user allow');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuth, adminAndReceptAuth };
