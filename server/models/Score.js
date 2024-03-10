const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const scoreSchema = new Schema ({
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Art', 'Books', 'Computers', 'Film', 'History', 'Science & Nature', 'Sports', 'TV'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Score = model('Score', scoreSchema);

module.exports = Score;