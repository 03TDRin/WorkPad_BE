const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Prioritize: {
        type: Number,
        required: true
    },
    DateCreate: {
        type: String,
        required : true
    },
    EmailCreate: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required : true
    },
})

module.exports = mongoose.model("Note", Schema, "Note");