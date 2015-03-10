// Require mongoose and other node modules \\
var mongoose = require("mongoose");
var http = require("http");
var url = require("url");
var fs = require("fs");
var ecstatic = require("ecstatic")({root: __dirname + "/public"});


mongoose.connect("mongodb://foundrymatrix:foundrymatrix@ds031108.mongolab.com:31108/serverblog");

// Get notification for connection success or failure \\
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection made");
});

// Define database schema which determines which properties we want to store \\
var userSchema = mongoose.Schema({
  userdata: { 
    username: { type : String , unique : true, required : true },
    password: { type : String , unique : true, required : true }
          },  
  blogposts: [{ 
    author : String,
    title  : String,
    text   : String,
    date   : Object,
    image  : String  
  }]
});

// Adding method to the schema. Have to be defined before schema is compiled \\
userSchema.methods.announce = function() {
  var author = this.author ? "Another blog post by " + this.author : "Anonymous blog post";
  console.log(author);
};

// Compile schema into a model, which defines the database collection \\
// First argument is collection name, second argument is schema name  \\

// Example: save new user to database
var User = mongoose.model("blogpost", userSchema);

new_user = new User({
    userdata: {
      username: 'john',
      password: '123'
    }
});

new_user.save(function (err,user){
  if (err) return console.error(err);
  console.log(user);
});

/*

// update a db object
user.findOneAndUpdate({ author: "bob smith" } ,{ $set: { title: "title nr 2" }}, function(err, blogpost){
  if (err){
    console.log(err)
  }
  console.log(blogpost);
});




module.exports = { 
        blogPost: blogPost
};


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
