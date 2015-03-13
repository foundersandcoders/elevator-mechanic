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


var tokenSchema = mongoose.Schema({
    GUID: Date,
    record: Object
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
var Token = mongoose.model("Token", tokenSchema);


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

function createBlogPost(clientdata){  
  new_blogpost = new BlogPost({
    author  : clientdata.author,
    title  : clientdata.title,
    text   : clientdata.text,
  });

  new_blogpost.save(function (err,post){
    if (err) return console.error(err);
    console.log('post is ', post);
  });
}

function getBlogPost(value, cb){
  console.log('running getBlogPost');
  BlogPost.find({_id: value}, function (err, posts){
      console.log("model.js getblogpost: " + posts);
      cb(posts);
  });
}

function updateBlogPost(id, clientdata){

  BlogPost.findOneAndUpdate({"_id": id} , { $set: { title:clientdata.title, text:clientdata.text }}, function (err, post){
    if (err) {
      console.log(err);
    }
    
  });
}

function deleteBlogPost(id){

    BlogPost.findOneAndRemove({"_id": id}, function (err, post){
        if (err) {
          console.log(err);
        }
    });
}

module.exports = { 
        User: User,
        Token: Token,
        BlogPost:BlogPost,
        updateBlogPost: updateBlogPost,
        deleteBlogPost: deleteBlogPost,
        createBlogPost: createBlogPost,
        getBlogPost: getBlogPost,
        BlogPost: BlogPost
};
