
const cookieController = {

    setDatabaseID (req, res, next) {
        res.cookie('app database ID', res.locals.user, {httpOnly: true});
        next();
    },

    setSSID (req, res, next) {
        const sessionID = req.sessionID || generateSessionID();
        res.cookie('SSID', sessionID, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 2
        });
        next();
    }



};

const generateSessionID = () => {
    return [...Array(30)]
      .map(() => Math.random().toString(36)[2])
      .join('');
  };

module.exports = cookieController;