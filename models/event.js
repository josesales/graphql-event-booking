const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;