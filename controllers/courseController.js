const Course = require("../models/Course");

//add a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
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
    const courses = await Course.find();
    res.status(200).render('courses',{
        courses,
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
    const course = await Course.findOne({slug:req.params.slug});
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
