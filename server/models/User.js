const {Schema, model} = require('mongoose');
const scoreSchema = require('./Score');

const userSchema = new Schema ({
    id: {
        type: Int,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'You need to use a valid email address!']
    },
    password: {
        type: String, 
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    score_value: {
        type: Int,
        required: true,
    },
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
