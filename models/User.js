const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
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
});

//bcrypt middleware
UserSchema.pre('save',function (next) {
  const user=this;
  //saltOrRounds means complexitiy of the crypted password
  bcrypt.hash(user.password,10,(error,hash)=>{
    user.password=hash; //hashed password
    next(); //next middleware
  })
})


//modele çevirme:
const User = mongoose.model("User", UserSchema);

//exporting
module.exports = User;
