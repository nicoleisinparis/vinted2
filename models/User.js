const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    username: String,
    avatar: Object,
  },
  email: String, // check below
  password: String,
  newsletter: Boolean,
  salt: String,
  token: String,
  hash: String,
});

module.exports = User;

// email:{ unique: true, type:String} if use this, the email won't be allowed to insert one than once.
