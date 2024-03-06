const {Schema, model} = require('mongoose');

const scoreSchema = new Schema ({
    Category: {
        type: String,
        required: true
    },
    user_id: {
        type: Int,
        required: true,
    },
    score: {
        type: Int,
        required: true,
    }
});

const Score = model('Score', scoreSchema);

module.exports = Score;