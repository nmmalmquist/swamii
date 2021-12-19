const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const verifyToken = require("./verifyToken");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests.
const router = express.Router();

//Get All Admins
router.get("/", async function (req, res) {
  const adminList = await Admin.find({});
  res.send(adminList);
});

//Get All active admins
router.get("/active", async function (req, res) {
  const adminList = await Admin.find({ deleted: false });
  res.send(adminList);
});

//Get All deleted Admins
router.get("/deleted", async function (req, res) {
  const adminList = await Admin.find({ deleted: true });
  res.send(adminList);
});

//Get a single non-deleted admin
router.get("/:username", async function (req, res) {
  const admin = await Admin.find({
    username: req.params.username,
    deleted: false,
  });
  res.send(admin);
});

//Find and UPDATE any admin
router.route("/update/:username").post(async function (req, res) {
  const response = await Admin.findOneAndUpdate(
    { username: req.params.username },
    req.body
  );
  res.send(response);
});

//DELETE by soft deleting updating
router.route("/delete/:username").post(async (req, res) => {
  await Admin.findOneAndUpdate(
    { username: req.params.username },
    { deleted: true }
  );
  res.send(`Admin ${req.params.username} was deleted`);
});

module.exports = router;
