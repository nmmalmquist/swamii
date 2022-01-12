const express = require("express");
const mongoose = require("mongoose");

const ChatMessages = require("../models/ChatMessage");

// The router will be added as a middleware and will take control of requests.
const router = express.Router();

//Get All messages
const getAllMessages = async() => {
  const chatMessages = await ChatMessages.find({}).sort({
    dateTimeCreated: "asc",
  });
  return chatMessages;
};
//save message to mongoDB
const saveMessage = async(message) => {
  //create a new chatMessage Object
  const chatMessage = new ChatMessages({
    text: message.text,
    username: message.username,
    userId: message.userId //string version
  })
  //save to DB
  try {
    await chatMessage.save()
  } catch (error) {
    console.log("could not save message to DB")
  }
};

module.exports.getAllMessages = getAllMessages;
module.exports.saveMessage = saveMessage;

