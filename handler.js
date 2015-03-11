var model = require('./model.js');

module.exports = {

	home: function handler(req, res, htmlOutput) {
		console.log("Request handler 'home' was called.");
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end(htmlOutput);
	},

	create: function handler(req, res) {
		console.log("Request handler 'create' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end("Create Article");

	},

	update: function handler(req, res) {
		console.log("Request handler 'update' was called.");
	   	//model.updateBlogPost('per', 1, 'updated text through mongodb');

	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end("Update Article");
	}
}

