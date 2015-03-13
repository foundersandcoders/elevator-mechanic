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
routes["/blogposts"] = handler.read;
routes["/save"] = handler.save;
routes["/delete"] = handler.deleteblog;
routes["/add"] = handler.add;

//*** Invokes the right handler or throws error ***//
var router = function(req, res){
	var url = req.url;
	console.log("url: "+url);
	var bloglink = querystring.parse(url);
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
			console.log("post data is", postData);
			clientData = querystring.parse(postData);
			console.log(clientData);
			console.log("bloglink path is -----", bloglink.path);
			routes[bloglink.path](req, res, bloglink.blogid, clientData);
		});
	} else if(typeof routes[bloglink.path] === 'function'){
		routes[bloglink.path](req, res, bloglink.blogid, bloglink);
	} else if (typeof routes[url] === 'function'){
		routes[url](req, res);
	} else {
		ecstatic(req, res);
	}


}

http.createServer(router).listen(port);

console.log('Server running on port', port);