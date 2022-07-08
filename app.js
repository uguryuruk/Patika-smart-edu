const express = require("express");

const app = express();
//template engine
app.set("view engine","ejs");

//middlewares-static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("index",{
    page_name:"index"
  });
});
app.get("/about", (req, res) => {
  res.status(200).render("about",{
    page_name:"about"
  }
  );
});

const port=3000;

app.listen(port,() => {
    console.log(`App started on port ${port}`);
})
