const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');



const authRouter = express.Router();

authRouter.post('/signup', userController.createUser, (req, res) => {
    console.log("Signup was submitted");
    res.status(200).json({ message: 'Signup successful', user: res.locals.savedUser });
});
  
authRouter.post('/login', userController.verifyUser, sessionController.startSession, (req, res) => {
    console.log ('You have sucessfully logged in');
    return res.status(200).json({ log: 'User sucessfully logged in', user: res.locals.user });
});


module.exports = authRouter;