const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res) => {
  const userData = { username: req.body.username, password: req.body.password };
  User.findOne(userData).then(data => {
    if (data) {
      res.cookie('token' ,jwt.sign(userData, process.env.SECRET));
      res.send(req.body.username);
    } else {
      res.status(401).send("Login Failed");
    }
  });
});

module.exports = router;