
module.exports = {

	home: function handler(req, res) {
		console.log("Request handler 'home' was called.");
	    res.writeHead(200, {"Content-Type": "text/plain"});
	    res.end("Welcome everybody");
	},

	create: function handler(req, res) {
		console.log("Request handler 'create' was called.");
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("Create Article");
	},

	update: function handler(req, res) {
		console.log("Request handler 'update' was called.");
	    res.writeHead(200, {"Content-Type": "text/plain"});
	    res.end("Update Article");

	},
}

