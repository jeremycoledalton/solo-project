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

      
app.use(cors()); //left open with no conditions; currently unsure of how this will effect other areas



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


const adminRouter = require('./routers/adminRouter.js');
app.use('/admin', adminRouter); 

const authRouter = require('./routers/authRouter.js');
app.use('/auth', authRouter);


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


  //console logs to check these items
  console.log ('Node Environment: ', process.env.NODE_ENV)
  console.log ('MongoURI: ', mongoURI)


  module.exports = { app, mongoURI };