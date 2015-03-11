var http = require("http");
var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var handler = require("./handler");
var port = 4000;


//*** List of Routes and Associated Handler Functions ***//
var routes = {}
routes["/"] = handler.home;
routes["/create"] = handler.create;
routes["/update"] = handler.update;

//*** Invokes the right handler or throws error ***//
var router = function(req, res){
	var url = req.url;
	console.log("server says this is a ", req.method)
	if (req.method == 'POST'){
		var postData = "";
		req.setEncoding("utf8");
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});
		req.addListener("end", function() {
			routes[url](req, res, postData);
		});
	} else if (typeof routes[url] === 'function'){
		routes[url](req, res);
	} else {
	    ecstatic(req, res);
	}
}

http.createServer(router).listen(port);

console.log('Server running on port', port);