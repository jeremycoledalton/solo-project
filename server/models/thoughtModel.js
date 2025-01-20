const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    //Only need to pass in username and message. others are set by default

    {
        message: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
            required: true
        },
        expiresAt: {
            type: Date,
            default: function () {
                return new Date(Date.now() + 1000 * 60);
            }
        }
    });

    const Thought = mongoose.model('Thought', thoughtSchema);

    module.exports = Thought;