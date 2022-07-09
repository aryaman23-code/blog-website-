//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts=[];
//creat an empty global array you will see the use later 

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//we need body parser and extended true is so that we 
// Lcan check for any datatypes not just string 

app.use(express.static("public"));
//this was done to get the css file 

app.get("/",function(req,res){//<--------------------------------------------------------------------------------------------|
  res.render("home",{
    startingContent:homeStartingContent,                                                                                   //|
    posts:posts
  });
                                                                                                                           //|
  //so wehn enter localhost 3000 the home route gets redered and we are passing staritng content and posts to the home.ejs file 
  //now switch to the home.ejs to understand more 
  
});
// ------------------------------------ now move to home.ejs file                                                          //|


app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});                                                                   //|
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});                                                                          //|
});
app.get("/compose",function(req,res){                                                                                       //|
  res.render("compose");
});                                                                                                                         //|
//this is so that when we click the compose ,about and contact on the navbar we can find the necessary pages                    
                                                                                                                            //|
                                                                                                                            
app.post("/compose",function(req,res){                                                                                      //|
  ///just have a look at compose.ejs file before coming here please                                                         
                                                                                                                            //|
  const post={                                                                                                              
    title:req.body.postTitle,                                                                                               //|
    content:req.body.postBody                                                                                               
  };                                                                                                                        //|
  //so basically title gets the value from the input part and content from text-area                                        
  //and we put all this in a post objects and we are pushing that object into posts array                                   //|
                                                                                                                            
                                                                                                                            //|
  posts.push(post);                                                                                                         
  res.redirect("/");//---------------------------------------------------------------------------------------------------------
  //no we are redirecting to the root directory

});

app.get("/posts/:postName" ,function(req,res){
  //here we are making use of express routing parameteres
  var requestedTitle=_.lowerCase(req.params.postName);
  //here we have made use of an npm module called lodasht lowercase the js we entere on the search
  posts.forEach(function(post)
  {
    //we are basically traversign the posts array 
    var storedTitle=_.lowerCase(post.title);
    //we are lowercasing the titles in the posts array 
    
    if(requestedTitle===storedTitle)
    {
      //if the match then we render it on the posts page for a custo output 
      res.render("post",{
        postedTitle:post.title,
        postedContent:post.content

      });
    }

  });
 

});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
