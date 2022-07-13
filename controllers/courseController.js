const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

//add a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID, //user info is coming from session
    });

    //successfully added
    req.flash("success",`${course.name} has been created successfully!`);

    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error",`An error has occured!`);

    res.status(400).redirect("/courses");
  }
};
//LiST ALL courses
exports.getAllCourses = async (req, res) => {
  try {
    const query = req.query.search;
    //filtering with category
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    //filter by category
    if (categorySlug) filter = { category: category._id };
    //filter by keyword
    if (query) filter = { name: query };
    //filter check
    if (!query&& !categorySlug) {
      filter.name="",
      filter.category=null
    }


    //get all courses & categories
    //order by createdAt desc
    const courses = await Course.find({
      //filtering by keyword or category, case insensitive
      $or:[
        {name: {$regex:'.*'+filter.name+'.*',$options:'i'}},
        {category:filter.category}
      ]
    }).sort("-createdAt").populate('user'); //in order to show teacher's name
    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
//get one course
exports.getCourse = async (req, res) => {
  try {
    //in order to change enroll button
    const user = await User.findById(req.session.userID);
    //with populate, you can use user's details like name, email etc.
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find();

    res.status(200).render("course-single", {
      course,
      page_name: "course",
      user,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
//enroll one course
exports.enrollCourse = async (req, res) => {
  try {
    //adds course to User model
    const user = await User.findById(req.session.userID).populate('courses');
     user.courses.push({ _id: req.body.course_id });
    await user.save();
    let lastCourse= await Course.findById(user.courses.at(-1)._id);

    
    req.flash("success",`You have enrolled to ${lastCourse.name} successfully!`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
//quit from the course
exports.releaseCourse = async (req, res) => {
  try {
    //adds course to User model
    const user = await User.findById(req.session.userID);
    deletedCourse= await Course.findById(req.body.course_id);

    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    
    req.flash("success",`You have quitted from the course ${deletedCourse.name}.`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course=await Course.findOneAndRemove({slug:req.params.slug});
    //delete from enrolled students:TODO TEST
    // await User.courses.deleteMany({_id:course._id});
    req.flash("success",`You have removed the ${course.name}.`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {    
    //Find the course
    const course = await Course.findOne({slug:req.params.slug});
    //update db
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    course.save();

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};