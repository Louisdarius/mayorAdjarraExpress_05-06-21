const Role = require('../models/roleModel');

/**
 * Gett all roles controller
 */
async function getAllRoles(req, res, next) {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a specific role controller
 */
async function getEachRole(req, res, next) {
  try {
    const role = await Role.findById(req.params.id);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

/**
 * Add a role controller
 */
async function addRole(req, res, next) {
  const newRole = new Role(req.body);
  try {
    const createdRole = await newRole.save();
    res.json(createdRole);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a role controller
 */
async function updateRole(req, res, next) {
  try {
    const updatePatient = await Role.findById(req.params.id);
    updatePatient.name = req.body.name;
    const patient = await updatePatient.save();
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a role controller
 */
async function deleteRole(req, res, next) {
  try {
    const deleteRole = await Role.findByIdAndRemove(req.params.id);
    res.json({ message: `A ${deleteRole.name} was deleted` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllRoles,
  getEachRole,
  addRole,
  updateRole,
  deleteRole,
};
