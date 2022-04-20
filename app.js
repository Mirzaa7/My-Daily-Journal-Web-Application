const express = require("express");
const bodyParser = require("body-parser");    // require different modules
const ejs = require("ejs");
let posts = [];
const _ = require("lodash");

const homeStartingContent = "This is a Daily Journal. To add a post click on CREATE A POST."

const aboutContent = "This Daily Journal is a server-side web application built using Node.js and Express.js with EJS templating. New journal posts are created dynamically and rendered on the required pages along with the current date of the post."

const app = express();

app.set("view engine", "ejs");      // EJS setting

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var currentDate = new Date();                               // Home route get req
  var displayDate = currentDate.toLocaleDateString("en-UK");
  res.render("home", { homeText: homeStartingContent , postsArray: posts, newDate: displayDate });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutText: aboutContent });   // About route get req
});

app.get("/compose", function(req, res){
  res.render("compose");                    // Compose route get req
});

app.get("/posts/:topic", function(req, res){      // Dynamic posts get req
  posts.forEach(function(element){          // use lodash to convert space or dash separated strings into lowercase
    if(_.lowerCase(element.postTitle) === _.lowerCase(req.params.topic)){   
      res.render("post", {elementTitle: element.postTitle, elementText: element.postText});
    }               // Render a new page of the requested post topic(the read more link)
  });
  
});

app.post("/compose", function(req, res){
  const post = {
    postTitle: req.body.titleInput,         // Post req handle
    postText: req.body.postInput      
  }
  posts.push(post);
  res.redirect("/");        // Redirect to the home route
  
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

