const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 4;


const userSchema = new mongoose.Schema(
    //for now we want userName, password, admin(boolen)

    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            required: true
        }
    }
)
userSchema.pre('save', function(next){
    bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        if(err) {
            return next(err)
        };
        this.password = hash;
        return next();
    })
})

module.exports = mongoose.model('User', userSchema);