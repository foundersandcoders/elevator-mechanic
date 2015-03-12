var model = require('./model.js');
var jade = require("jade");
var rootPath = __dirname + "/views";
var url = require("url");
// var mongoose = require("mongoose");
// var ObjectId = mongoose.Types.ObjectId;



module.exports = {

	home: function handler(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
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

	read: function handler(req, res, blogid){
		model.getBlogPost(blogid);
		
		    var path = rootPath + "/blog.jade";
		    var fn = jade.compileFile(path);
			var htmlOutput = fn(htmlOutput);
			
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		
	},

	update: function handler(req, res) {
		console.log("Request handler 'update' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end("updated");
	}
	

	

}
