const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 3000;

const users = [ 
    {username: 'Jeremy', password: 'password'},
    {username: 'admin', password: 'admin'},
];

/**
 * 404 handler
 */
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });
  
  /**
   * Global error handler
   */
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });
  
  app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });