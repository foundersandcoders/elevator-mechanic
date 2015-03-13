var model = require('./model.js');
var jade = require("jade");
var rootPath = __dirname + "/views";
var url = require("url");
// var mongoose = require("mongoose");
// var ObjectId = mongoose.Types.ObjectId;


module.exports = {

	home: function handler(req, res) {
		model.BlogPost.find({}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	},

	create: function handler(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/create.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
		});
	},

	add: function handler(req, res, blogid, clientdata) {
		model.createBlogPost(clientdata);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	},

	read: function handler(req, res, blogid){
		model.getBlogPost(blogid, function(posts){
			var path = rootPath + "/blog.jade";
		    var fn = jade.compileFile(path);
			var htmlOutput = fn({posts: posts});
			console.log("posts- ----", posts[0].title)
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		

		});
		
		  
	},

	update: function handler(req, res, blogid) {
		model.getBlogPost(blogid, function(posts){
			console.log("update handler: "+ posts);
			var fn = jade.compileFile(rootPath + "/update.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	},

	save: function handler(req, res, blogid, clientdata) {
		model.updateBlogPost(blogid, clientdata);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	},

	deleteblog: function handler(req, res, blogid) {
		model.deleteBlogPost(blogid);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	}

}
