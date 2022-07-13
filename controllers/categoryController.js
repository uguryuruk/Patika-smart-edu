const Category = require("../models/Category");

//add a new category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash("success",`New category added.`);

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {    

    await Category.findByIdAndRemove(req.params.id);
    req.flash("success",`You have removed the category.`);

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};