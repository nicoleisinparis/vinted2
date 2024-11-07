const express = require("express");
const router = express.Router();
const User = require("../models/User");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, newsletter } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "missing info" });
    }
    const user = await User.findOne({ email: email }); // can be somply write ({email})
    if (user) {
      return res.status(409).json({
        message: "this email being used, please change another email address",
      });
    }

    const salt = uid2(64);
    const token = uid2(64);
    const hash = SHA256(password + salt).toString(encBase64);

    const newUser = new User({
      email: email,
      account: {
        username: username,
      },
      newsletter: newsletter,
      salt: salt,
      token: token,
      hash: hash,
    });
    console.log(newUser);
    await newUser.save();
    // res.json("your account is registered");

    return res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      account: newUser.account,
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const verifyPassword = SHA256(req.body.password + user.salt).toString(
      encBase64
    );
    if (verifyPassword === user.hash) {
      return res.status(201).json({
        _id: user._id,
        token: user.token,
        account: user.account,
      });
    } else {
      return res.status(400).json({ message: "email or password incorrect" });
    }
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
