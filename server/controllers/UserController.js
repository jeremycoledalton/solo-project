const User = require ('../models/userModel');
const bcrypt = require('bcryptjs'); //required for varifyUser function to hash the password

const userController = {


    
    
    createUser(req, res, next) {
        const { username, password } = req.body;
        
        const admin = false;
        
        const user = new User ({ username, password, admin });
        user.save().then((user) => {
            console.log(`User ${user.username} added`);
            res.locals.user = user;
            return next();
        }).catch((err) => {
            console.log('Error saving user', err);
            res.status(400).json({
                err: err,
                log: 'Failed to save user to database'
            });
        });
        
    },
    
    verifyUser(req, res, next) {
      const {username, password} = req.body;
      User.findOne({username: username})
      .then ((user) => {
        if (!user) {
            return res.status(401).json({ log: 'User not found' });
        } 
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log('Error comparing passwords:', err);
                return res.status(500).json({ log: 'Error verifying password', err: err })
            }
            if (!isMatch) {
                return res.status(401).json({ log: 'Invalid credentials' });
            } else {
                console.log('User verified sucessfully');
                res.locals.user = user;
                return next();
            }

        });
        
      }).catch((err) => {
        console.log('Error verifying user:', err);
        res.status(500).json({ 
            err: err, 
            log: 'Internal server error' });
        });

    },
    
    
    updateUser(req, res) {
        const { searchUsername } = req.params;
        const { username, password, admin } = req.body;

        User.findOne({ username: searchUsername})
        .then ((user) => {
            if (!user) {
                return res.status(400).json({ log: 'Failed to find User, null' });
            };
            if (username) user.username = username;
            if (password) user.password = password;
            if (admin) user.admin = admin;

            user.save().then((updatedUser) => {
                console.log ('User has been updated');
                res.status(200).send(updatedUser);
            })
        }).catch((err) => {
            console.log('Error updating user:', err);
        res.status(400).json({ 
            err: err, 
            log: 'No user found to update' });
        });
    },



    getUser (req, res) {
        const { username } = req.params;
        User.findOne({ username: username})
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(400).json({ log: 'Failed to find User, null' });
            };
            console.log (`User ${foundUser.username} found`);
            res.status(200).send(foundUser);
        }).catch((err) => {
            console.log('Error finding user', err);
            res.status(400).json({
                err:err,
                log: 'Failed to fetch user from the database'
            });
        })
    },



    deleteUser(req, res, next) {
        const { username } = req.query
        User.deleteOne({ username: username})
        .then((user) => {
            if (user.deletedCount === 0) {
                console.log('No user found');
                return res.status(400).json({ 
                    err: err,
                    log: 'No user found. Failed to delete'
                });
            } else if (user.deletedCount === 1) {
                return next();
            };
        }).catch((err) => {
            console.log('Error finding user', err);
            res.status(400).json({
                err: err,
                log: 'No user found to delete'
            });
        });
    },

    getAllUsers (req, res, next){
        User.find({})
        .then(users => {
            res.locals.users=users;
            return next();
        }).catch(error => {
            res.status(500).json({ message: 'Error fetching users', error });
        });
    }

};

module.exports = userController;