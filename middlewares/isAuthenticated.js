const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    //   console.log(req.headers.authorization);

    const token = req.headers.authorization.replace("Bearer ", "");
    //   console.log(token);
    const user = await User.findOne({ token: token }).select("account _id");
    //   console.log(user);

    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = isAuthenticated;
