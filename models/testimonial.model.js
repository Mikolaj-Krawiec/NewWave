const mongoose = require('mongoose');
const { model } = require('./seat.model');

const testimonialModel = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Testimonial', testimonialModel);