//Express imports and start
const cors = require('cors');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

//cookie related imports
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController.js');

//user related imports
const userController = require('./controllers/userController.js');

//session related imports
const sessionController = require('./controllers/sessionController.js');

//thought related imports
const thoughtController = require('./controllers/thoughtController.js');

//Mongoose imports and URI connection
const connectDB = require('./database.js');
const mongoURI = 
  process.env.NODE_ENV === 'production'
    ? 'mongodb://localhost/user-database-production'
    : process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost/user-database-test'
      : 'mongodb://localhost/user-database-development';


connectDB(mongoURI);

      
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {

    
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

}



app.get('/allUsers', userController.getAllUsers, (req, res) => {
  console.log("Users: ", res.locals.users);
  return res.status(200);
});

app.get('/allSessions', sessionController.getAllSessions, (req, res) => {
  console.log("Sessions: ", res.locals.sessions);
  return res.status(200);
});

app.get('/allThoughts', thoughtController.getAllThoughts, (req, res) => {
  console.log("Thoughts: ", res.locals.thoughts);
  return res.status(200);
});


app.post('/signup', userController.createUser, (req, res) => {
  console.log("Signup was submitted");
  res.status(200).json({ message: 'Signup successful', user: res.locals.savedUser });
});

app.post('/login', userController.verifyUser, sessionController.startSession, (req, res) => {
  console.log ('You have sucessfully logged in');
  return res.status(200).json({ log: 'User sucessfully logged in', user: res.locals.user });
});

app.post('/logout', sessionController.endSession, (req, res) => {
  return res.status(200).json({ message: 'User logged out successfully' });
});


//invoke this with Postman to delete specific users
app.get('/deleteUser', userController.deleteUser, (req, res) => {
  console.log ('User was deleted');
  return res.status(200);
});

//404 handler
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
  
  
  //Global error handler
  app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
      return next(err); // Pass to default Express error handler
    }
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });
  
  if ( require.main === module ) {
    app.listen(PORT, () => { 
      console.log(`Listening on port ${PORT}...`); 
    });
  }


  module.exports = { app, mongoURI };