const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
//internal
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

//add a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
};

//login
//1.if email exists
//compare passwords via bcrypt
//if they are the same, logs in
//TODO: Send PR
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // DONE
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        console.log(err);
        if (same) {
          //USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Your Password is not correct!");
          res.status(400).redirect("login");
        }
      });
    } else {
      req.flash("error", "User does not exist.");
      res.status(400).redirect("login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getDashboardPage = async (req, res) => {
  //in order to write user's name in the dashboard
  //and the courses he has enrolled
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  //courses of a teacher:
  const courses = await Course.find({ user: req.session.userID });
  //normally wrong, should be a special page for it.
  const users = await User.find();

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
exports.deleteUser = async (req, res) => {
  try {
    //delet user
    const user=await User.findByIdAndRemove(req.params._id);
    //and if a teacher, delete related courses
    await Course.deleteMany({user:req.params._id})
    
    req.flash("success",`You have removed the ${user.name}.`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};