var shot = require("shot");
var handler = require("../handler.js");
var assert = require("assert");
var request;



describe("TEST: home page response in test.js", function(){
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

describe("Token validation", function(){
    it('should fail if string is not a valid token', function(done){
        assert.equal( handler.verify('werklmwef'), false);
        done();
    });

    var decoded = { auth: 1426257698493,
          agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
          exp: 1426862498493,
          iat: 1426257698 }

    it('should pass if string is  a valid token', function(done){
        assert.deepEqual(handler.verify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoxNDI2MjU3Njk4NDkzLCJhZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzEwXzApIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS80MS4wLjIyNzIuODkgU2FmYXJpLzUzNy4zNiIsImV4cCI6MTQyNjg2MjQ5ODQ5MywiaWF0IjoxNDI2MjU3Njk4fQ.k4Aoqmr3kmndboQSDBP2ndgahdnxB1sNLOcIfikP_DY'), decoded);
        done();
    });


});



/*

describe("TEST: home page response in test.js", function(){
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
});



describe("Token validation", function(){
    it('should fail if string is not a valid token', function(done){
        assert.equal( server.verify('werklmwef'), false);
    });
});




describe("Main page (reading view)", function () {

   request = {
        method: "GET",
        url: "/"
    };


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

 
    it("should respond with an OK status code", function (done) {

       

        shot.inject(server, request, function (res) {
            assert.equal(res.statusCode, 200);
            done();
        });

    });
    
    it("should show a list of blog entry titles", function (done) {

       
        shot.inject(server, request, function (res) {
            // Placeholder test - looking for evidence of 'blog post' html
            assert.equal(res.payload.match(/blog/), true);
            done();
        });

    });
    
    
    it("should show excerpts of the most recent blog posts", function (done) {

       
        shot.inject(server, request, function (res) {
            // Placeholder test - looking for evidence of 'blog post' html
            assert.equal(res.payload.match(/blog/), true);
            done();
        });

    });
        
});

describe('Edit Page', function(){
    
     it("should respond with an OK status code", function (done) {

        request = {
            method: "GET",
            url: "/edit"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.statusCode, 200);
            done();
        });

    }); 
    
    it("should show a text editor for writing your blog post", function (done) {

        request = {
            method: "GET",
            url: "/edit"
        };

        shot.inject(server, request, function (res) {
            // Placeholder test looking for 'input' field
            assert.equal(res.payload.match(/input/), true);
            done();
        });

    }); 
    
    it("should select a post from list in edit page for editing", function (done) {

        request = {
            method: "GET",
            url: "/edit/<blog_post_id_number>"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.payload, "");
            done();
        });

    });
    
    it("should add new blog post", function (done) {

        request = {
            method: "POST",
            url: "/edit"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.payload, "");
            done();
        });

    });
    
    it("should delete selected blog post", function (done) {
        request = {
            method: "DELETE",
            url: "/edit/<blog_post_id_number>"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.payload, "");
            done();
        });

    });
    
 
    it("should update selected blog post", function (done) {

        request = {
            method: "PUT",
            url: "/edit/<blog_post_id_number>"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.payload, "");
            done();
        });

    });

});

describe('Individual Post Page', function(){
    
    it("should retreive a and display single blog post", function (done) {

        request = {
            method: "GET",
            url: "/blog/<blog_post_id_number>"
        };

        shot.inject(server, request, function (res) {
            assert.equal(res.payload, "");
            done();
        });

    });
    
});

*/


