var http = require("http");
var handler = require("./handler");
var app = http.createServer(handler);

app.listen(4000);
