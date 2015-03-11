var shot = require("shot");
var handler = require("../handler");
var assert = require("assert");
var request;

describe("Home page", function () {

    it("should respond with an OK status code", function (done) {

        request = {
            method: "GET",
            url: "/"
        };

        shot.inject(handler, request, function (res) {
            assert.equal(res.statusCode, 200);
            done();
        });

    });

});
