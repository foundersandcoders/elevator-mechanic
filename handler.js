var model = require('./model.js');
var jade = require("jade");
var path = __dirname + "/views";
var url = require("url");
var jwt  = require('jsonwebtoken');
var secret = "CHANGE_THIS_TO_SOMETHING_RANDOM"; // super secret
var querystring = require('querystring');

test_data = {
	name: 'hi'
}


function authFail(req,res){
	res.writeHead(401, {'Content-Type': 'text/html'});
	var fn = jade.compileFile(path + "/fail.jade");
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
	return token;
}

function authSuccess(req,res, id){
	var GUID = generateGUID(); // Question: What is this?
	var token = generateToken(req, GUID);
	var record = {
		valid: "true",
		created: new Date().getTime()
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
	var fn = jade.compileFile(path + "/restricted.jade");
	res.end(fn(test_data));

}


// lookup person in "database"
var u = { un: 'per', pw: '123', id: '5' };


function authHandler(req,res){
		console.log('AuthHandler triggered');
		if (req.method === 'POST'){
			console.log('req.method is POST')
			var body = '';
			req.on('data', function(data){
				console.log('data recieved: ',data)
				body += data;
			});
			req.on('end', function(){
				var post = querystring.parse(body);
				if (post.username && post.username === u.un && post.password && post.password == u.pw){
					console.log('auth succeed');
					var id = un.id;
					return authSuccess(req,res, id);
				} else {
					console.log('auth failed');
					return authFail(req,res);
				}
			});
		} else {
			return authFail(req, res);
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
	return decoded;
}

function validate(req, res, callback){
	console.log('running validate')
	var token = req.headers.authorization || req.headers.cookie;
	// console.log(req.headers)
	console.log('token is: ', token);
	var decoded = verify(token);
	console.log(decoded);
	if ( !decoded || !decoded.auth ){ // why isnt !decoded enough
		console.log()
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
			if (err){
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
			var fn = jade.compileFile(path + "/logout.jade");
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

	var fn = jade.compileFile(path + "/restricted.jade");
  	var htmlOutput = fn(test_data);
  	return res.end(htmlOutput);
}

function home_login(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var fn = jade.compileFile(path + "/home_login.jade");
  var htmlOutput = fn(test_data);
  return res.end(htmlOutput);
}

function home(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(path + "/index.jade");
			var htmlOutput = fn({posts:posts});
			console.log("Request handler 'home' was called.");
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(htmlOutput);
  		});		
}

function create(req, res) {
		model.BlogPost.find({author: 'per'}, function(err,posts){
		    var fn = jade.compileFile(path + "/create.jade");
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


	

module.exports = {
	home: home,
	create: create,
	update: update,
	authHandler: authHandler,
	home_login: home_login,
	authFail: authFail,
	validate: validate,
	logout: logout
}	


