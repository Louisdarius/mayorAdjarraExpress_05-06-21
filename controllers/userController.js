const User = require('../models/userModel');

// Gett all users controller
async function getUsers(req, res, next){
    try {
        const users = await User.find().populate('role');
        res.json(users);       
    } catch(error){
        next(error);
    }
}

// Get a specific user controller
async function getUser(req, res, next){
    try{
        const user = await User.findById(req.params.id).populate('role');
        res.json(user);
    } catch(error){
        next(error);
    }
}

/**
 * Add a user controller
 */

 async function addUser(req, res, next){
     const newUser = new User(
         {
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             email: req.body.email,
             tel: req.body.tel,
             role: req.body.role,
         });
         try{
             const user = await newUser.save();
             await user.populate('role').execPopulate();
             res.json(user);
         } catch(error){
             next(error);
         }

 }

 /**
 * Update a user controller
 */

 async function updateUser(req, res, next){
     const updateUser = await User.findById(req.params.id);
     (updateUser.firstName = req.body.firstName)
     (updateUser.lastName = req.body.lastName)
     (updateUser.email = req.body.email)
     (updateUser.tel = req.body.tel)
     (updateUser.role = req.body.role)
     try {
         const user = await updateUser.save();
         await user.populate('role').execPopulate();
         res.json(user);
     }
     catch(error){
         next(error);
     }
 }

 /**
 * Delete a user controller
 */

 async function deleteUser(required, res, next){
     try {
        const deleteUser = await User.findById(req.params.id);
        const user = deleteUser.remove();
        const fullName = `${user.firstName} ${user.lastName} has been deleted`;
        res.json(fullName);

     } catch(error){
         next(error);
     }
 }

module.exports = {
    getUsers,
    getUser, 
    addUser,
    updateUser,
    deleteUser
};
