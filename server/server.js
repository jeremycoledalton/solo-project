const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const MOCK_DB = path.join(__dirname, 'mock-db.json')
const PORT = 3000;


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {

    console.log (req.body)
    
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

}

app.post('/signup', (req, res) => {
  console.log("hello world");
  console.log(req.body);
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));


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