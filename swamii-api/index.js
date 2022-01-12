const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = express();

// Loads the configuration from .env to process.env
dotenv.config();
const PORT = process.env.PORT || 5000;


// Connect to Database
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true}, ()=> {
  console.log("connected to DB Mongoose style")
})


//MiddleWare
app.use(cors());
app.use(express.json());

//Route MiddleWare
app.use("/api/users",  require('./routes/users'));
app.use("/api/admins",  require('./routes/admins'));
app.use("/api/auth",  require('./routes/auth'));


// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
});



  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });