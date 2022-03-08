const express = require("express");
const mongoose = require("mongoose");

const ChatMessages = require("../models/ChatMessage");


//Get All messages
const getAllMessages = async (user) => {
  //filter for only messages where the signed in user is either a recipient or sender of the message
  const chatMessages = await ChatMessages.find({
    $or: [{ recipient: { $in: [user.username, "Everyone"]}}, { sender: user.username }],
  }).sort({
    dateTimeCreated: "desc",
  });
  return chatMessages;
};
//save message to mongoDB
const saveMessage = async (message) => {
  
  //create a new chatMessage Object
  const chatMessage = new ChatMessages({
    text: message.text,
    sender: message.sender,
    recipient: message.recipient,
    senderId: message.senderId, //string version
  });
  //save to DB
  try {
    await chatMessage.save();
  } catch (error) {
    console.log("could not save message to DB");
  }
};



module.exports.getAllMessages = getAllMessages;
module.exports.saveMessage = saveMessage;