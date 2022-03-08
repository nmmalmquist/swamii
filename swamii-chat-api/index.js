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

//this array will be a map of each connected user's username to their socket.id
let connectedUsers = [];

// makes server a websocket type using socket.io for realtime updating
socketIO.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("disconnect", (reason) => {
    console.log("user disconnected")
    connectedUsers = connectedUsers.filter((i) => {
      return i.socketId != socket.id;
    });
  });

  socket.on("addUser", (user) => {
    connectedUsers.push({ username: user.username, socketId: socket.id });
    console.log(connectedUsers);
  });
  //used for debugging. will log any event that happends
  // socket.onAny((event, ...args) => {
  //   console.log(event, args);
  // });

  socket.on("privateMessage", async ({ message, user }) => {
    if (message || message != "") {
      await chatDB.saveMessage(message);
    }
  
    let recipientClients = connectedUsers.filter((i) => {
      
      return message.recipient == i.username;
    });
    if(message.recipient == "Everyone")
    {
      recipientClients = connectedUsers
    }
    
    recipientClients.map((i) => {
      console.log(i.socketId)
      socket.to(i.socketId).emit("privateMessage", message);
    });
  });

  //Gets called to update whenever the front end calls (usually to get the first initial pull of messages or to send a new one to update the database)
  //NOTE: THIS SHOULD ONLY BE USED FOR PINGING USER SPECIFIC MESSAGES. THIS SHOULD NOT BE PINGED WHEN USER SENDS MESSAGE.
  socket.on("initMessageGrab", async ({ message, user }) => {
    //first save new message if there is one
    if (message || message != "") {
      await chatDB.saveMessage(message);
    }
    //get and return all messages from DB, while saving a copy on this server
    const allMessages = await chatDB.getAllMessages(user);
    socketIO.to(socket.id).emit("initMessageGrab", allMessages);
  });
});
// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
