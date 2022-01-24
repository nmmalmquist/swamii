const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const { isObject } = require("util");
const server = http.createServer(app);
const socketIO = require("socket.io")(server, { cors: { origin: "*" } });
const chatDB = require("./database/chat");

//global messages to decrease how many time we hit DB for data
let messages = [];

// Loads the configuration from .env to process.env
dotenv.config();
const PORT = process.env.PORT || 5556;

// Connect to Database
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true }, () => {
  console.log("connected to DB Mongoose style");
});

//MiddleWare
app.use(cors());
app.use(express.json());

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
});

// makes server a websocket type using socket.io for realtime updating
socketIO.on("connection", (socket) => {
  console.log("a user is connected");

  //Gets called to update whenever the front end calls (usually to get the first initial pull of messages or to send a new one to update the database)
  //NOTE: getting the messages is specific to only the signed in user in the front end
  socket.on("message", async ({ message, user }) => {
    //first save new message if there is one
    if (message || message != "") {
      await chatDB.saveMessage(message);
    }
    //get and return all messages from DB, while saving a copy on this server
    const allMessages = await chatDB.getAllMessages(user);
    messages = allMessages;
    socketIO.emit("message", allMessages);

    //get and return all chatItem from DB
    //chat items are created by sifting through the messages. these look like the list of recent messages on your imessage homescreen on an iphone
    const allChatItems = await chatDB.getAllChatItems(allMessages, user);
    socketIO.emit("chatItem", allChatItems);
  });

  socket.on("chatItem", async (allMessages) => {
    //get and return all chatItem from DB
    const allChatItems = await chatDB.getAllChatItems(allMessages);
    socketIO.emit("chatItem", allChatItems);
  });

  socket.on("partyGroupMessage", async (chatListItem) => {
    //get and return all chatItem from DB
    console.log(chatListItem)
    const partySpecificMessages = messages.filter((i) => {
      return (
        (i.sender === chatListItem.sender &&
          i.recipient === chatListItem.recipient) ||
        (i.sender === chatListItem.recipient &&
          i.recipient === chatListItem.sender)
      );
    });
    console.log(partySpecificMessages);
    socketIO.emit("partyGroupMessage", partySpecificMessages);
  });
});
// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
