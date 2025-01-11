const User = require ('../models/UserModel');

const UserController = {


    createUser(req, res) {
        const { userName, password, admin } = req.body;

        const user = new User ({ userName, password, admin });
        user.save().then((savedUser) => {
            console.log(`User ${savedUser.username} added`);
            res.status(200).send(savedUser)
        }).catch((err) => {
            console.log('Error saving user', err);
            res.status(400).json({
                err: err,
                log: 'Failed to save user to database'
            });
        });
    },



    updateUser(req, res) {
        const { searchUserName } = req.params;
        const { userName, password, admin } = req.body;

        User.findOne({ userName: searchUserName})
        .then ((user) => {
            if (!user) {
                return res.status(400).json({ log: 'Failed to find User, null' });
            };
            if (userName) user.userName = userName;
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
        const { userName } = req.params;
        User.findOne({ userName: userName})
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(400).json({ log: 'Failed to find User, null' });
            };
            console.log (`User ${foundUser.userName} found`);
            res.status(200).send(foundUser);
        }).catch((err) => {
            console.log('Error finding user', err);
            res.status(400).json({
                err:err,
                log: 'Failed to fetch user from the database'
            });
        })
    },



    deleteUser(req, res) {
        const { userName } = req.params;
        User.deleteOne({ userName: userName})
        .then((user) => {
            if (user.deletedCount === 0) {
                console.log('No user found');
                res.status(400).json({ 
                    err: err,
                    log: 'No user found. Failed to delete'
                });
            } else if (user.deletedCoung === 1) {
                console.log('User deleted');
                res.status(200).json({ log: user });
            };
        }).catch((err) => {
            console.log('Error finding user', err);
            res.status(400).json({
                err: err,
                log: 'No user found to delete'
            });
        });
    }

    

};

module.exports = UserController;