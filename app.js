const express = require("express");
const pageRoute = require('./routes/pageRoute');
const app = express();
//template engine
app.set("view engine","ejs");

//middlewares-static files
app.use(express.static("public"));

app.use("/", pageRoute);


const port=3000;

app.listen(port,() => {
    console.log(`App started on port ${port}`);
})
