var http = require("http");
var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var handler = require("./handler");
var port = 4000;
var querystring = require('querystring');

//*** List of Routes and Associated Handler Functions ***//
var routes = {}
routes["/"] = handler.home;
routes["/create"] = handler.create;
routes["/update"] = handler.update;
routes["/auth"] = handler.authHandler;
routes["/home_login"] = handler.home_login;
routes["/private"] = handler.validate;
routes["/logout"] = handler.logout;

//*** Invokes the right handler or throws error ***//
var router = function(req, res){
	var url = req.url;

	if (typeof routes[url] === 'function')	{
		routes[url](req, res);
	}
	else{
		ecstatic(req, res);
	}

	/*
	console.log("server says this is a ", req.method)
	if (req.method == 'POST'){
		var postData = "";
		req.setEncoding("utf8");
		
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received a POST data chunk '"+
			postDataChunk + "'.");
		});
		req.addListener("end", function() {
			clientData = querystring.parse(postData);
			routes[url](req, res, clientData);
		});
	} else if (typeof routes[url] === 'function'){
		routes[url](req, res);
	} else {
	    ecstatic(req, res);
	}

	*/
}

http.createServer(router).listen(port);

console.log('Server running on port', port);