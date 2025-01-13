//Express imports and start
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

//cookie related imports
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController.js');

//user related imports
const userController = require('./controllers/userController.js');

//Mongoose imports and URI connection
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'production' ? 'mongodb://localhost/user-database-production' : 'mongodb://localhost/user-database-development';

//is this needed? are we still using the mock db?
const MOCK_DB = path.join(__dirname, 'mock-db.json')


mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', cookieController.setSSID, (req, res) => {

    
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

}

app.get('/home', (req, res) => {
  return res.status(200);
})
app.get('/login', (req, res) => {
  return res.status(200);
})
app.get('/signup', (req, res) => {
  return res.status(200);
})

app.get('/allUsers', userController.getAllUsers, (req, res) => {
  console.log("Users: ", res.locals.users);
  return res.status(200);
});

app.post('/signup', userController.createUser, (req, res) => {

  console.log("Signup was submitted");
  es.status(200).json({ message: 'Signup successful', user: res.locals.savedUser });


});

app.delete('/deleteUser', userController.deleteUser, (req, res) => {
  console.log ('User was Deleted');
  return res.status(200).json({ log: 'User deleted successfully' });
});

//404 handler
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
  
  
  //Global error handler
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });
  
  app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });