
/*
var shot = require("shot");
var handler = require("../handler.js");
var assert = require("assert");
var request;


describe("TEST: home page response in test-handler.js", function(){
	it('should return 200 as the status code', function(done){
		request = {
			method: 'GET',
			url: '/'
		}

		shot.inject(handler.home, request, function(response){
			assert.equal(response.statusCode, 200);
			done();
		});
	});

	it('should return the correct string', function(done){
		request = {
			method: 'GET',
			url: '/test'
		}

		shot.inject(handler.home, request, function(response){
			assert.equal(response.payload, "Welcome test");
			done();
		});
	});

});






describe("create page response", function(){
	it('should return 200 as the status code', function(done){
		request = {
			method: 'GET',
			url: '/create'
		}
		shot.inject(handler.create, request, function(response){
			assert.equal(response.statusCode, 200);
			done();
		});
	});

	it('should return the correct string', function(done){
		request = {
			method: 'GET',
			url: '/create'
		}

		shot.inject(handler.create, request, function(response){
			assert.equal(response.payload, "Create Article");
			done();
		});
	});
});






describe("update page response", function(){
	it('should return 200 as the status code', function(done){
		request = {
			method: 'GET',
			url: '/update'
		}
		shot.inject(handler.update, request, function(response){
			assert.equal(response.statusCode, 200);
			done();
		});
	});

	it('should return the correct string', function(done){
		request = {
			method: 'GET',
			url: '/update'
		}

		shot.inject(handler.update, request, function(response){
			assert.equal(response.payload, "Update Article");
			done();
		});
	});


});

*/