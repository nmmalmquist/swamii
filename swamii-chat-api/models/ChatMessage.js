
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        min: 1
    }, 
    sender: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    dateTimeCreated: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
    
})


module.exports = mongoose.model('chatMessages', chatMessageSchema)