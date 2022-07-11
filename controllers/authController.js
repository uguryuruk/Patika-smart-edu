const bcrypt = require("bcrypt");
const User = require("../models/User");

//add a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

//login
//1.if email exists
//compare passwords via bcrypt
//if they are the same, logs in
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        console.log(err);
        if (same) {
          //USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect("/");
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser= (req,res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
}