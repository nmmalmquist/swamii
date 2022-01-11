
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        min: 1
    }, 
    username: {
        type: String,
        required: true,
    },
    userId: {
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


module.exports = mongoose.model('ChatMessage', chatMessageSchema)