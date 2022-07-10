const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre("validate", function (next) {
  //this leri yakalamak için function kullandık.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, //sadece string karakterleri alır.
  });
  next(); //sıradaki middleware geçer.
});
//modele çevirme:
const Category = mongoose.model("Category", CategorySchema);

//exporting
module.exports = Category;
