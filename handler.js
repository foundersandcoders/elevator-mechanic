var jade = require("jade");
var path = __dirname + "/views";
var url = require("url");

var data = {
    userdata: {
		username: "per",
		password: "123"
    },  

    blogposts: [
	    { 
			author : "per",
			title  : "pers post",
			text   : "pers text",
			date   : "01/03/2015",
		    image  : "http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-9/128/square-icon.png"
	 	},
		{
			author : "per2",
			title  : "pers post 2",
			text   : "pers text 2",
			date   : "05/03/2015",
			image  : "http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-9/128/square-icon.png"  
		}
	]
}

module.exports = {

	home: function handler(req, res) {
		var fn = jade.compileFile(path+"/index.jade");
		var htmlOutput = fn(data);
		console.log("Request handler 'home' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(htmlOutput);
	},

	create: function handler(req, res) {
<<<<<<< HEAD
		console.log("create"+req.url);
=======
		model.createBlogPost('per','hello','blogpost text', {"day": "4"}, "img_link");
>>>>>>> bdfe61e2f318a07baaf3d1ce8fb0aab17f6f5452
		console.log("Request handler 'create' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(htmlOutput);
	},

	update: function handler(req, res) {
		console.log("update"+req.url);
		console.log("Request handler 'update' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(htmlOutput);
	},
	
	addblog: function handler(req, res) {
		var fn = jade.compileFile(path+req.url+".jade");
		var htmlOutput = fn(data);
		console.log("Request handler 'update' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(htmlOutput);
	}
}

