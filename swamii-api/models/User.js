const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1
    },
    lastName: {
        type: String,
        required: true,
        min: 1
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    username: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    intitalBalance: {
        type: Number,
        default: 1000
    },
    currentBalance: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    
})


module.exports = mongoose.model('User', userSchema)