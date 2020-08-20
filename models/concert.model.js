const mongoose = require('mongoose');

const concertModel = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    performer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Concert', concertModel);