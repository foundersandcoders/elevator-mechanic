// Require mongoose and other node modules \\
var mongoose = require("mongoose");
var http = require("http");
var url = require("url");
var fs = require("fs");
var ecstatic = require("ecstatic")({root: __dirname + "/public"});


mongoose.connect("mongodb://localhost/");

// Get notification for connection success or failure \\
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection made");
});

// Define database schema which determines which properties we want to store \\
var blogSchema = mongoose.Schema({
  author : String,
  title  : String,
  text   : String,
  date   : Object,
  image  : String
});

// Adding method to the schema. Have to be defined before schema is compiled \\
blogSchema.methods.announce = function() {
  var author = this.author ? "Another blog post by " + this.author : "Anonymous blog post";
  console.log(author);
};

// Compile schema into a model, which defines the database collection \\
// First argument is collection name, second argument is schema name  \\
var blogPost = mongoose.model("blogpost", blogSchema);

// Example blog post \\
var testPost = new blogPost({ author : "bob smith",
                 title : "read these words",
                   text : "this is some informatioon about an interesting topic of my choice",
                  date : "new data object",
                 image : "img src ='www.google.com/images/pineapple"
              });

// Saves submitted blog post to database and displays a message confirming

testPost.save(function(err, testPost){
  if (err) return console.error(err);
  testPost.announce();
});

// Create http server to serve saved blogposts \\
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
