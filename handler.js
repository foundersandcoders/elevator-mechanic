
module.exports = {


	home: function handler(req, res) {
		// console.log("Request for " + pathname + " received.");

	    res.writeHead(200, {"Content-Type": "text/plain"});
	    res.write("Welcome");
	    res.end(" to Testing");

	},

	create: function handler(req, res) {
		// console.log("Request for " + pathname + " received.");

	    res.writeHead(200, {"Content-Type": "text/plain"});
	    res.write("Welcome");
	    res.end(" to create article");

	},

	update: function handler(req, res) {
	// console.log("Request for " + pathname + " received.");

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Welcome");
    res.end(" to update article");

	},

	//createArticle

	//updateArticle

	//deleteArticle

	//viewArticle


}

