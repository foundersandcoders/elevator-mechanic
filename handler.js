var model = require('./model.js');
var jade = require("jade");
var path = __dirname + "/public/index.jade";
var fn = jade.compileFile(path);
var data = {user: "asim"}  //DUMMY DATA
var htmlOutput = fn(data);

module.exports = {

	home: function handler(req, res) {
		console.log("Request handler 'home' was called.");
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end(htmlOutput);
	},

	create: function handler(req, res, postData) {
		console.log("Request handler 'create' was called.");
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write("you have just posted your blogpost: ");
		res.write(postData);
		res.end();
	},

	update: function handler(req, res) {
		console.log("Request handler 'update' was called.");
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end("Update Article");
	}
}

