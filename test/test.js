var shot = require("shot");
var server = require("../handler");
var assert = require("assert");
var request;

describe("Main page (reading view)", function () {

    request = {
        method: "GET",
        url: "/"
    };
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