const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const thoughtController = require('../controllers/thoughtController.js');

// Admin Tools Router

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    console.log ('Inside the AdminRouter');
    console.log ('Consider some other details to put here')
    return res.status(200);

});

//Get All Data Types
adminRouter.get('/allUsers', userController.getAllUsers, (req, res) => {
    console.log("Users: ", res.locals.users);
    return res.status(200);
});

adminRouter.get('/allSessions', sessionController.getAllSessions, (req, res) => {
    console.log("Sessions: ", res.locals.sessions);
    return res.status(200);
});

adminRouter.get('/allThoughts', thoughtController.getAllThoughts, (req, res) => {
    console.log("Thoughts: ", res.locals.thoughts);
    return res.status(200);
});


//Delete User 
adminRouter.get('/deleteUser', userController.deleteUser, (req, res) => {
    console.log ('User was deleted');
    return res.status(200);
});

// add routes for delete ALL for all data Types

// also need to add delete all methods to each data type

module.exports = adminRouter

// END Admin Tools Router