const Session = require('../models/sessionModel');

const sessionController = {

    
  async isLoggedIn(req, res, next) {
    try {
      console.log(req.cookies);
      const session = await Session.findOne({cookieId: req.cookies.ssid});
      
      if(!session){
        return res.status(400);
      }

      return next();
    } catch (err) {
      return next({
        log: 'Error occurred in sessionController. isLoggedIn.',
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },


  async startSession(req, res, next) {
    const { _id } = res.locals.user;
    console.log (res.locals.user);

    try {
      console.log('Session being started for user: ', _id);
      const session = Session.create({cookieId: _id});
      return next();

    } catch (err) {
        return next({
            log: 'error occured in sessionController.startSession',
            message: { err: 'an error occured in sessionController.startSession Check server logs for more details.'},
            status: 500,
      });
    };
  },

  async endSession (req, res, next) {
    try {
      await Session.deleteOne({ CookieID: req.cookies.ssid});
      res.clearCookie('ssid');
      console.log('Session ended');
      return next();

    } catch(err) {
      return next({
        log: 'error occured in sessionController.startSession',
        message: { err: 'an error occured in sessionController.startSession Check server logs for more details.'},
        status: 500,
      });
    };
  },


  async getAllSessions (req, res, next){
    try {
      const sessions = Session.find({})
      res.locals.sessions=sessions;
      return next();
    } catch (err) {
      return next({
        log: 'error occurred in sessionController.getAllSessions',
        message: {err: 'An error occurred while fetching sessions. Check server logs for more details.'},
        status: 500,
      });

    }
  },
};

module.exports = sessionController;