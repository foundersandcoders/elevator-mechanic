var model = require('./model.js');
var jade = require("jade");
var path = __dirname + "/views";
var url = require("url");


module.exports = {

	home: function handler(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(path + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});		
	},


	create: function handler(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(path + "/create.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});		
	},

	read: function handler(req,res){
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    path = path + "/" + blogId + ".jade";
		    var fn = jade.compileFile(path);
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	},

	update: function handler(req, res) {
		console.log("Request handler 'update' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end("updated");
	}
	

	

}
