var shot = require("shot");
var server = require("../handler.js");
var assert = require("assert");

var request;


describe("server should...", function() {

    it("respond with 200", function(done) {

        request = {
            method: "GET",
            url: "/"
        };

        shot.inject(server, request, function(res) {

            assert.equal(res.statusCode, 200);
            done();

        });

    });

});
