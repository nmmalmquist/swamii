const express = require("express");
const mongoose = require("mongoose");

const ChatMessages = require("../models/ChatMessage");


//Get All messages
const getAllMessages = async (user) => {
  //filter for only messages where the signed in user is either a recipient or sender of the message
  const chatMessages = await ChatMessages.find({
    $or: [{ recipient: user.username }, { sender: user.username }],
  }).sort({
    dateTimeCreated: "desc",
  });
  return chatMessages;
};
//save message to mongoDB
const saveMessage = async (message) => {
  console.log(message)
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

//Get All messages
const getAllChatItems = async (allMessages, user) => {
  allChatItems = [];
  userChatItemsCreated = [];
  userFound = false;

  //logic to make sure only on chat item is created for 1 user. so this tracks if one has already been created
  allMessages.forEach(async(message) => {
    userChatItemsCreated.forEach((createdChatItem) => {
      //checks to see if the two party combo in a message has already been created in a chatListItem
      if (
        (message.sender == createdChatItem.sender &&
          message.recipient == createdChatItem.recipient) ||
        (message.sender == createdChatItem.recipient &&
          message.recipient == createdChatItem.sender)
      ) {
        userFound = true;
      }
    });
    if (userFound) {
      userFound = false;
    } else {
      //add to the chatItem Array
      tempChatItem = {
        _id: message._id,
        sender: message.sender,
        text: message.text,
        recipient: message.recipient,
        dateTimeCreated: message.dateTimeCreated,
      };

      //makes the title of the chatListItem always of the other person you are contacting. i.e you should never see your own username int the title field
      if (user.username == tempChatItem.sender) {
        tempChatItem.title = tempChatItem.recipient;
      } else {
        tempChatItem.title = tempChatItem.sender;
      }
      //Get the avatarURL of the other party by getting the user from the database
    
      allChatItems.push(tempChatItem);
      userChatItemsCreated.push(tempChatItem);
      userFound = false;
    }
  });
 
  return allChatItems;
};

module.exports.getAllMessages = getAllMessages;
module.exports.saveMessage = saveMessage;
module.exports.getAllChatItems = getAllChatItems;
