//3rd party
const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
//internal
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

//init express
const app = express();

//template engine
app.set("view engine", "ejs");

//global Variable- user session
global.userIN = null;

//connection string-On error, use 127.0.0.1 instead of localhost
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db").then(() => {
  console.log("Connected to db");
});

//middlewares-static files, body parameters

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db",
    }), //storing sessions in db
  })
);
//flash messages:
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
//method override: using parameter, methods to override
app.use(methodOverride('_method',{
  methods:['POST','GET'],
}));

//routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
