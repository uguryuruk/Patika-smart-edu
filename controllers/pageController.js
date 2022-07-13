const nodemailer = require("nodemailer");
const mailing = require("../temp/privateInfo");
//internal
const Course = require("../models/Course");
const User = require("../models/User");
//get pages

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort("-createdAt").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.sendEmail = async (req, res) => {
  try {
    // console.log(req.body);

    //html template for contact mail
    const outputMessage = `
  <h1>Mail Details</h1>
<ul>
    <li>Name: ${req.body.name} </li>
    <li>Email: ${req.body.email} </li>
</ul>
<h2>message</h2>
<p>${req.body.message}</p>
  `;

    //taken from node mailer web site
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports

      //UPDATE THOSE FOR YOU-MINE IS IN PRIVATE FOLDER
      auth: {
        user: mailing.user, // gmail account
        pass: mailing.password, // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Smart EDU contact Form" <${mailing.user}>`, // sender address
      to: mailing.receiver, // list of receivers
      subject: "New Message from Smart EDU", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    //flash message
    req.flash("success", "We have received your message successfully");

    res.status(200).redirect("contact");
  } catch (error) {
    req.flash("error", "An error has occured");
    console.log(error);
    res.status(200).redirect("contact");
  }
};
