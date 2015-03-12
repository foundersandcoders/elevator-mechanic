// Require mongoose and other node modules \\
var mongoose = require("mongoose");
var http = require("http");
var url = require("url");
var fs = require("fs");
var ecstatic = require("ecstatic")({root: __dirname + "/public"});
var handler = require('./handler.js');

mongoose.connect("mongodb://foundrymatrix:foundrymatrix@ds030827.mongolab.com:30827/blog");

// Get notification for connection success or failure \\
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection made");
});


// Define database schema which determines which properties we want to store \\
var userSchema = mongoose.Schema({
  username: { type : String , unique : true,  required : true  },
  password: { type : String , unique : false, required : true  },
  email:    { type : String , unique : true,  required : false }
});


var blogSchema = mongoose.Schema({
  author  : String,
  title   : String,
  text    : String,
  date    : {type: Date, default: Date.now }
});


// Adding method to the schema. Have to be defined before schema is compiled \\
userSchema.methods.announce = function() {
  var author = this.author ? "Another blog post by " + this.author : "Anonymous blog post";
  console.log(author);
};

// Compile schema into a model, which defines the database collection \\
// First argument is collection name, second argument is schema name  \\



// Example: save new user to database

var User = mongoose.model("User", userSchema);
var BlogPost = mongoose.model("BlogPost", blogSchema);



/*
new_user = new User({
      username:  'per5333rge3rdsz',
      password:  '123343' ,
      email: 'perhb@hotmail.com'
    });

new_user.save(function (err,user){
  if (err) return console.error(err);
  console.log(user);
});

*/


new_post = new BlogPost({
    author : 'per',
    title  : 'pers post 2',
    text   : 'pers text 2',

});


new_post.save(function (err,post){
  if (err) return console.error(err);
  // console.log('post is', post);
});



function getBlogPost(value, cb){
  console.log('running getBlogPost');
  BlogPost.find({_id: value}, function (err, posts){
      console.log("model.js getblogpost: " + posts);
      cb(posts);
  });
}

function createBlogPost(username,title,text,date,image){  
  new_blogpost = new BlogPost({
    author : username,
    title  : title,
    text   : text,
  });

  new_blogpost.save(function (err,post){
    if (err) return console.error(err);
    console.log('post is ', post);
  });
}

function createUser(){

}

function updateBlogPost(id, cb){

  User.findOneAndUpdate({_id: id} , function (err,user){
    if (err) {
      console.log(err);
    }
    user.blogposts.forEach(function (blogpost){
      if (blogpost.id === id){
        blogpost.text = text;
        blogpost.title = title;
      }
    });

    console.log(user);
    user.save();

    cb();

  });
}

function deleteBlogpost(username,id){

  User.update({username:username}, {$pull: { blogposts: { id: 1} }} ,false,  function(err,user){
    if (err){
      console.log(err);
    }
    console.log(user);
  });

}

module.exports = { 
        User: User,
        updateBlogPost: updateBlogPost,
        deleteBlogpost: deleteBlogpost,
        createBlogPost: createBlogPost,
        getBlogPost: getBlogPost,
        BlogPost: BlogPost
};





/*

// update a db object
user.findOneAndUpdate({ author: "bob smith" } ,{ $set: { title: "title nr 2" }}, function(err, blogpost){
  if (err){
    console.log(err)
  }
  console.log(blogpost);
});






*/




// Create http server to serve saved blogposts \\
/*
http.createServer(function (request, response) {
  if (request.url === "/") {
    blogPost.find(function(err, blogPost) {
      response.write(JSON.stringify(blogPost));
      response.end();
    });
  } else if (request.url === "/form") {
      fs.readFile('index.html', function(err, page) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(page);
        response.end();
      })
    }
}).listen(4000);

console.log("Server running at 4000");

*/
