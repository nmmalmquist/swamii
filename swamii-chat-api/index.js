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

// makes server a websocket type using socket.io for realtime updating
socketIO.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("message", async (message) => {
    console.log("new data: "+ JSON.stringify(message));
    //first save new message if there is one
    if (message || message != "") {
      await chatDB.saveMessage(message);
    }
    //get and return al messages from DB
    const allMessages = await chatDB.getAllMessages();
    socketIO.emit("message", allMessages);
  });
});
// start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
