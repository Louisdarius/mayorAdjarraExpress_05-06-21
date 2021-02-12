const Role = require('../models/roleModel');

async function getAllRoles(req, res, next) {
  try {
    const roles = await Role.find()
    res.json(roles);
  } catch (error) {
    next(error);
  }
}

async function getEachRole(req, res, next) {
    try {
        const role = await Role.findById(req.params.id)
        res.json(role);
    } catch (error) {
        next(error);
    }
}

async function addRole(req, res, next) {
    const newRole = new Role({
        name: req.body.name,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });
    try {
        const createdRole = await newRole.save();
        res.json(createdRole)
    } catch (error) {
        next(error);
    }
    
}

async function updateRole(req, res, next){
    try {
        const updateRole = await Role.findById(req.params.id)
        (updateRole.name = req.body.name)
        (updateRole.createdAt = req.body.createdAt)
        (updateRole.updatedAt = req.body.updatedAt)
        const updatedRole = await updateRole.save();
         res.json(updatedRole);
    } catch (error){
        next(error);
    }  

}

async function deleteRole(req, ers, next){
    try{
        const deleteRole = await Role.findByIdAndRemove(req.params.id)
        res.json({message: `A ${deleteRole.name} was deleted`})
    } catch (error){
        next(error);
    }

}

module.exports = {
    getAllRoles,
    getEachRole,
    addRole,
    updateRole,
    deleteRole
};