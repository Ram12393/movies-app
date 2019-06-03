const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    theatre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre'
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.Schema('Feedback', FeedbackSchema)