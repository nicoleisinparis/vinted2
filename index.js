const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const app = express();
app.use(express.json());
require("dotenv").config();

mongoose.connect("mongodb://localhost/vinted");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use("/user", userRoutes); //app.use("/user", userRouter); not working
app.use("/offer", offerRoutes);
// const User = mongoose.model("User", {
//   account: {
//     username: String,
//     avatar: Object,
//   },
//   email: String,
//   password: String,
//   newsletter: Boolean,
//   salt: String,
//   token: String,
//   hash: String,
// });

// app.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password, newsletter } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "missing info" });
//     }
//     const user = await User.findOne({ email: email });
//     if (user) {
//       return res.status(409).json({
//         message: "this email being used, please change another email address",
//       });
//     }

//     const salt = uid2(64);
//     const token = uid2(64);
//     const hash = SHA256(password + salt).toString(encBase64);

//     const newUser = new User({
//       email: email,
//       account: {
//         username: username,
//       },
//       newsletter: newsletter,
//       salt: salt,
//       token: token,
//       hash: hash,
//     });
//     console.log(newUser);
//     await newUser.save();
//     // res.json("your account is registered");

//     return res.status(201).json({
//       _id: newUser._id,
//       token: newUser.token,
//       account: newUser.account,
//     });
//   } catch (error) {
//     console.log("error");
//     res.status(400).json({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     const verifyPassword = SHA256(req.body.password + user.salt).toString(
//       encBase64
//     );
//     if (verifyPassword === user.hash) {
//       return res.status(201).json({
//         _id: user._id,
//         token: user.token,
//         account: user.account,
//       });
//     } else {
//       return res.status(400).json({ message: "email or password incorrect" });
//     }
//   } catch (error) {
//     console.log("error");
//     res.status(500).json({ error: error.message });
//   }
// });

app.all("*", (req, res) => {
  res.status(404).json({
    message: "this route is not exist",
  });
});

app.listen(3000, () => {
  console.log("sever started");
});
