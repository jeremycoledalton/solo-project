const Session = require('../models/sessionModel');

const sessionController = {

    
  isLoggedIn(req, res, next) {
      console.log(req.cookies);
      Session.findOne({cookieId: req.cookies.ssid}, (err, session)=>{
        if(err){
          return next({
            log: 'Error occurred in sessionController. isLoggedIn.',
            status: 500,
            message: { err: 'An error occurred' },
          });
        }else if(!session){
          return res.redirect('/signup');
        }else{
          return next();
        }
      })
  },


  startSession(req, res, next) {
    const { _id } = res.locals.user;
    console.log (res.locals.user);

    Session.create({cookieId: _id}, (err, session)=>{
      if(err){
        return next({
            log: 'error occured in sessionController.startSession',
            message: {
            err: { err: 'an error occured in sessionController.startSession Check server logs for more details.'},
            },
            status: 500,
      })};
      console.log('Session started for user: ', _id);
      return next();
    });
  },


  getAllSessions (req, res, next){
    Session.find({})
    .then(sessions => {
        res.locals.sessions=sessions;
        return next();
    }).catch(error => {
        res.status(500).json({ message: 'Error fetching sessions', error });
    });
  },
  

};

module.exports = sessionController;