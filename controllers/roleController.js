const Role = require('../models/roleModel');

async function getAllRoles(req, res, next) {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

async function getEachRole(req, res, next) {
  try {
    const role = await Role.findById(req.params.id);
    res.json(role);
  } catch (error) {
    next(error);
  }
}

async function addRole(req, res, next) {
  const newRole = new Role({
    name: req.body.name,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
  try {
    const createdRole = await newRole.save();
    res.json(createdRole);
  } catch (error) {
    next(error);
  }
}

async function updateRole(req, res, next) {
  try {
    const updatePatient = await Role.findById(req.params.id);
    (updatePatient.name = req.body.name),
      (updatePatient.updated_at = req.body.updated_at);

    const patient = await updatePatient.save();
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

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
