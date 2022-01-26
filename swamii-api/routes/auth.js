const express = require("express");
const User = require("../models/User");
const Admin = require("../models/Admin");
const { registerValidation, loginValidation } = require("../validation");
const argon = require("argon2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

///////////////////////////////////////
//REGISTER A NEW USER
////////////////////////////////////////
router.post("/user/register", async (req, res) => {
  //Check Validation before adding user
  const { error } = registerValidation(req.body);
  if (error)
    return res.send({ errorState: 1, message: error.details[0].message });

  //Check if user already in Database
  const emailExists = await User.findOne({
    email: req.body.email.toLowerCase(),
  });
  const usernameExists = await User.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (emailExists)
    return res.send({
      errorState: 3,
      message: "Email already exists in database",
    });
  if (usernameExists)
    return res.send({
      errorState: 3,
      message: "Username already exists in database",
    });

  //Hash password
  let hashPassword = req.body.password;
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    hashPassword = hash;
  } catch (error) {
    console.log("Could not hash password : " + error);
  }

  
  if (hashPassword == req.body.password)
    return res.send({
      errorState: 4,
      message: "Could not hash password. User Not created",
    });

  //create new user object
  const user = new User({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashPassword,
    initialBalance: 1000,
    currentBalance: 1000,
    deleted: false,
  });

  //save new user to database
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.send({ errorState: 400, message: "Could not save user to DB" });
    console.log("ERROR : " + error);
  }
});

///////////////////////////////////////
//LOGIN A USER
////////////////////////////////////////

router.post("/user/login", async (req, res) => {
  //Check Validation before adding user
  const { error } = loginValidation(req.body);
  if (error)
    return res.send({ errorState: 1, message: error.details[0].message });

  //Check if user username exists
  const user = await User.findOne({
    username: req.body.username.toLowerCase(),
  });
  console.log(user);
  if (!user) return res.send({ errorState: 0, message: "Username is invalid" });

  //Check if password is correct
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
 

  if (!validPassword)
    return res.send({ errorState: 0, message: "Password is invalid" });

  //If all validation checks out, then Create web token and send to front-end
  const token = jwt.sign(
    { _id: user._id, username: user.username, avatarURL: user.avatarURL },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

///////////////////////////////////////
//REGISTER A NEW ADMIN
////////////////////////////////////////
router.post("/admin/register", async (req, res) => {
  //Check Validation before adding admin
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if admin already in Database
  const emailExists = await Admin.findOne({
    email: req.body.email.toLowerCase(),
  });
  const usernameExists = await Admin.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (emailExists)
    return res.send({
      errorState: 3,
      message: "Email already exists in database",
    });
  if (usernameExists)
    return res.send({
      errorState: 3,
      message: "Username already exists in database",
    });

  //Hash password
  let hashPassword = req.body.pasword;
  try {
    hashPassword = await argon.hash(req.body.password);
  } catch (error) {
    console.log("Could not hash password : " + error);
  }
  if (hashPassword == req.body.password)
    return res.send({
      errorState: 4,
      message: "Could not hash password. User Not created",
    });

  //create new Admin object
  const admin = new Admin({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashPassword,
  });

  //save new admin to database
  try {
    const savedAdmin = await admin.save();
    res.send({ admin: admin._id });
  } catch (error) {
    res.send({ errorState: 400, message: "Could not save user to DB" });
    console.log("ERROR : " + error);
  }
});

///////////////////////////////////////
//LOGIN An Admin
////////////////////////////////////////

router.post("/admin/login", async (req, res) => {
  //Check Validation before adding admin
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if admin username exists
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).send("Username or Password is not valid");

  //Check if password is correct
  const validPassword = await argon.verify(admin.password, req.body.password);
  if (!validPassword)
    return res.status(400).send("Email or Password is invalid");

  //If all validation checks out, then Create web token and send to front-end
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  console.log("admin logged in");
});

module.exports = router;
