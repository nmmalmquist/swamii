const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    deleted: {
        type: Boolean,
        default: false
    },
    
})


module.exports = mongoose.model('Admin', adminSchema)