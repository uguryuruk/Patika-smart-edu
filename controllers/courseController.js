const Course = require("../models/Course");
const Category = require("../models/Category");

//add a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name:req.body.name,
      description:req.body.description,
      category:req.body.category,
      user:req.session.userID  //user info is coming from session
    });

    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
//LiST ALL courses
exports.getAllCourses = async (req, res) => {
  try {
//filtering with category
    const categorySlug = req.query.categories;
    const category = await Category.findOne({slug:categorySlug});

    let filter={};

    if(categorySlug) filter={category:category._id}

    //get all courses & categories
    //order by createdAt desc
    const courses = await Course.find(filter).sort('-createdAt');
    const categories=await Category.find();

    res.status(200).render('courses',{
        courses,
        categories,
        page_name:'courses'
    })
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
    //with populate, you can use user's details like name, email etc.
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    res.status(200).render('course-single',{
        course,
        page_name:'course'
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
