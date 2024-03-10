const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    id: {
        type: Int,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
        minlength: 5,
    },
// should category and score value by tied to scores? no user model?
    category: {
        type: String,
        required: true,
    },
// should category and score value by tied to scores? no user model?
    score_value: {
        type: Int,
        required: true,
    },
}
);

const User = model('User', userSchema);

module.exports = User;
