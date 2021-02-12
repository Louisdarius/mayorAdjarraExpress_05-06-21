const mongoose = require('mongoose');
const Role     = require('./models/roleModel');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, userUnifiedTopology: true})
.then(()=>console.log('Coonected'))
.catch(err => console.log(err));

const seedRoles = [
    {
        name: 'Student',
        createdAt: '2021-08-25',
        updatedAt: '2022-05-20'
    },
    {
        name: 'Admin',
        createdAt: '2025-07-08',
        updatedAt: '2026-05-04'
    },
    {
        name: 'Doctor',
        createdAt: '2020-05-01',
        updatedAt: '2022-03-10'
    },
    {
        name: 'Receptionist',
        createdAt: '2021-12-19',
        updatedAt: '2024-02-05'
    },
    {
        name: 'Developer',
        createdAt: '2050-01-29',
        updatedAt: '2059-09-03'
    }
];

const inserting = () =>{
Role.insertMany(seedRoles)
.then(roles => console.log(roles))
.catch(err => console.log(err))
};

module.exports = inserting;



