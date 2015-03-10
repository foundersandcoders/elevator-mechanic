var http = require("http");
var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var handler = require("./handler");
var port = 4000;
var jade = require("jade");
var path = __dirname + "/public/index.jade";
var fn = jade.compileFile(path);

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
		    image  : "www.google.com/image"  
	 	}, 
		{ 
		    author : "per2",
		    title  : "pers post 2",
		    text   : "pers text 2",
		    date   : "05/03/2015",
		    image  : "www.google.com/image2"  
		}
	]
}

var htmlOutput = fn(data);

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
		routes[url](req, res, htmlOutput);
	} else {
	    ecstatic(req, res);
	}
}

http.createServer(router).listen(port);

console.log('Server running on port', port);