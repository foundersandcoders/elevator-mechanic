var model = require('./model.js');
var jade = require("jade");
var rootPath = __dirname + "/views";
var url = require("url");
var jwt  = require('jsonwebtoken');
var secret = "CHANGE_THIS_TO_SOMETHING_RANDOM"; // super secret
var querystring = require('querystring');
// var mongoose = require("mongoose");
// var ObjectId = mongoose.Types.ObjectId;

test_data = {
	name: 'hi'
}


function authFail(req,res){
	res.writeHead(401, {'Content-Type': 'text/html'});
	var fn = jade.compileFile(rootPath + "/fail.jade");
	res.end(fn(test_data));
}

// Question: Why are we doing this?
function generateGUID() {
  return new Date().getTime(); 
}


function generateToken(req, GUID){
	var token = jwt.sign({
		auth: GUID,	
		agent: req.headers['user-agent'], // Question: What it this?
		exp: new Date().getTime() + 7*24*60*60*1000 // Question: so this token expires sometime?
	}, secret);
	console.log('token: ', token);
	return token;
}

function authSuccess(req, res, _id){
	var GUID = generateGUID(); // Question: What is this?
	var token = generateToken(req, GUID);
	var record = {
		valid: "true",
		created: new Date().getTime(),
		_id: _id
	};

	new_token = new model.Token({
		GUID: GUID,
		record: record
	});

	new_token.save(function (err, saved_token){
	    if (err) return console.error(err);
	    console.log('saved token: ', saved_token);
	});

	res.writeHead(200, {
		'Content-Type': 'text/html',
		'authorization': token,
		'Set-Cookie': token
	});
	var fn = jade.compileFile(rootPath + "/restricted.jade");
	res.end(fn(test_data));
}


// lookup person in "database"
u = { un: 'per', pw: '123', _id: '5' };

function authHandler( req, res,blogid,clientData ){
		console.log('AuthHandler triggered');
		console.log('cliendData: ', clientData);
		/*if (req.method === 'POST'){
			console.log('req.method is POST')
			var body = '';
			req.on('data', function (data){
				console.log('data recieved: ', data)
				body += data;
			});
			req.on('end', function(){
				var post = querystring.parse(body);
				console.log('username: ', u.un);
				console.log('id ', u._id);
				*/
		if (clientData.username && clientData.username === u.un && clientData.password && clientData.password == u.pw){
			//console.log('auth succeed. Id: ', id);
			var _id = u._id;
			return authSuccess(req,res, _id);
		} else {
			console.log('auth failed');
			return authFail(req,res);
		} 
}


function verify(token){
	console.log('running verify');
	var decoded = false;
	try{
		decoded = jwt.verify(token, secret); // question: whats happening here? Is it checking that it's a valid token according to our secret?
	} catch (e) {
		console.log('catch triggered');
		decoded = false;
	}
	console.log('decoded: ', decoded);
	return decoded;

}

function validate(req, res, callback){
	console.log('running validate')
	var token = req.headers.authorization || req.headers.cookie;
	// console.log(req.headers)
	console.log('token is: ', token);
	var decoded = verify(token);
	console.log('decoded: ', decoded);
	if ( !decoded || !decoded.auth ){ // why isnt !decoded enough
		console.log('decoded: ', decoded);
		authFail(req,res);
		//return callback(res);
	}
	else {
		model.Token.find({ GUID: decoded.auth}, function(err, db_token) {
			console.log('db_token:', db_token);
			record = db_token[0].record;
			console.log('record: ', record);
			console.log(typeof(record));
			if (err) {
				console.log('err: ',err);
				authFail(req,res);
			}
			else if ( !record.valid ) {
				console.log('record.valid in db is false. record: ', record )
				authFail(req,res)
			} else {
				privado(res,token);
				//return callback(res);
			}
		});
	}
}


function logout(req,res,callback){
	var token = req.headers.cookie;
	var decoded = verify(token);
	if (decoded){
		console.log('About to invalidate the record on the db')
		var conditions = { GUID: decoded.auth }
		model.Token.update(conditions, { $set: { 'record.valid': false} }, function (err,db_token) {
			if (err) {console.log(err);}
			console.log('in body of findOneAndUpdate..')
			console.log('db_token: ', db_token);
			res.writeHead(200, {
				'Content-Type': 'text/html',
				});
			var fn = jade.compileFile(rootPath + "/logout.jade");
		  	var htmlOutput = fn(test_data);
		  	res.end(htmlOutput);
		});
	}
}

function privado(res,token){
	res.writeHead(200, { 
		'Content-Type': 'text/html'
		//'authorization': token // I dont need this, I think.
	});

	var fn = jade.compileFile(rootPath + "/restricted.jade");
  	var htmlOutput = fn(test_data);
  	return res.end(htmlOutput);
}


function home_login(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var fn = jade.compileFile(rootPath + "/home_login.jade");
  var htmlOutput = fn(test_data);
  return res.end(htmlOutput);
}

function home(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts:posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});		
}

/*
function home(req, res) {
		model.BlogPost.find({}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	}
*/

function create(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/create.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});		
}

function update(req, res) {
		console.log("Request handler 'update' was called.");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end("updated");
}

	

function add(req, res, blogid, clientdata) {
		model.createBlogPost(clientdata);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});

	}

function read(req, res, blogid){
		model.getBlogPost(blogid, function(posts){
			var path = rootPath + "/blog.jade";
		    var fn = jade.compileFile(path);
			var htmlOutput = fn({posts: posts});
			console.log("posts- ----", posts[0].title)
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
		});
	}

function update(req, res, blogid) {
		model.getBlogPost(blogid, function(posts){
			console.log("update handler: "+ posts);
			var fn = jade.compileFile(rootPath + "/update.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'create' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	}

function save(req, res, blogid, clientdata) {
		model.updateBlogPost(blogid, clientdata);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	}

function deleteblog(req, res, blogid) {
		model.deleteBlogPost(blogid);
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(rootPath + "/index.jade");
			var htmlOutput = fn({posts: posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});
	}



module.exports = {
	home: home,
	create: create,
	update: update,
	authHandler: authHandler,
	home_login: home_login,
	authFail: authFail,
	validate: validate,
	logout: logout,
	deleteblog: deleteblog,
	save:save,
	update:update,
	read:read,
	add:add,
	update:update,
	verify:verify
}	


