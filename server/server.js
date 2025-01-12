//is fs needed?
const fs = require('fs');

//Express imports and start
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

//cookie related imports
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController.js')


//Mongoose imports and URI connection
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'production' ? 'mongodb://localhost/user-database-production' : 'mongodb://localhost/user-database-development';

//is this needed? are we still using the mock db?
const MOCK_DB = path.join(__dirname, 'mock-db.json')


mongoose.connect(mongoURI)
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

app.post('/signup', (req, res) => {
  console.log("hello world");
  console.log(req.body);
  return res.status(200).sendFile(path.join(__dirname, 'index.html'));


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