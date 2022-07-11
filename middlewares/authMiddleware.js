const User = require("../models/User");
//TODO: SEND PR
module.exports = async (req, res, next) => {
    //login check
  const user = await User.findById(req.session.userID);
  if (!user) return res.redirect("/login");
  next();
};
