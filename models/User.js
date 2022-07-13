const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"], //alabileceği değerler
    default: "student",
  },
  //student's courses
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

//bcrypt middleware
UserSchema.pre("save", function (next) {
  const user = this;
  // in order to prevent password change while enrolling course bug
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    //saltOrRounds means complexitiy of the crypted password
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash; //hashed password
      next(); //next middleware
    });
  });
});

//modele çevirme:
const User = mongoose.model("User", UserSchema);

//exporting
module.exports = User;
