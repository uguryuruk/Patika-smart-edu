//3rd party
const express = require("express");
const mongoose = require("mongoose");

//inside
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

//init express
const app = express();

//template engine
app.set("view engine", "ejs");

//connection string
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db").then(() => {
  console.log("Connected to db");
});

//middlewares-static files, body parameters
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
