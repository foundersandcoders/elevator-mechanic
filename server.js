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
	console.log("request received for ", url);

	if (typeof routes[url] === 'function'){
		routes[url](req, res); 
	} else {
	    ecstatic(req, res);
	}
}

http.createServer(router).listen(port);

console.log('Server running on port', port);

