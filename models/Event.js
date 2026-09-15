const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
        default: "Upcoming"
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;