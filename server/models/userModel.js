const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

//resetting salt work factor can be done here
const SALT_WORK_FACTOR = 4;


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    admin: {
      type: Boolean,
      default: false, 
    },
  });

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next (err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw err;
    }
  };

const User = mongoose.model('User', userSchema);

module.exports = User;