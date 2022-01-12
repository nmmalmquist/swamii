const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const verifyToken = require("./verifyToken");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

//Get All Users
router.get("/", async function (req, res) {
  const userList = await User.find({});
  res.send(userList);
});

//Get All active Users
router.get("/active", async function (req, res) {
  const userList = await User.find({ deleted: false });
  res.send(userList);
});
//Get All active Users sorted by balance
router.get("/active/ordered-by-balance", async function (req, res) {
  const userList = await User.find({ deleted: false }).sort({currentBalance: "desc"});
  res.send(userList);
});

//Get All deleted Users
router.get("/deleted", async function (req, res) {
  const userList = await User.find({ deleted: true });
  res.send(userList);
});

//Get a single non-deleted user
router.get("/:username", async function (req, res) {
  const user = await User.find({
    username: req.params.username,
    deleted: false,
  });
  res.send(user);
});

//Find and UPDATE any user
router.route("/update/:username").post(async function (req, res) {
  const response = await User.findOneAndUpdate(
    { username: req.params.username },
    req.body
  );
  res.send(response);
});

//DELETE by soft deleting updating
router.route("/delete/:username").post(async (req, res) => {
  await User.findOneAndUpdate(
    { username: req.params.username },
    { deleted: true }
  );
  res.send(`User ${req.params.username} was deleted`);
});

module.exports = router;
