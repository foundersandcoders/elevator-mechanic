module.exports = function handler(req, res) {

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Welcome");
    res.end(" to Testing");

};
