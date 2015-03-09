var http = require("http");
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
		console.log('Error, route for ', url, 'does not exist');
		res.writeHead(404, {"Content-Type": "text/plain"});
	    res.end(" ERROR!!");
	}
}


http.createServer(router).listen(port);

console.log('Server running on port', port);

