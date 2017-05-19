var path = require("path");

module.exports = function(app) {
	// send survey.html in response to '/survey' request
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
    // check for 'survey.html' as well
    app.get("/survey.html", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });
    app.use("/", function(req, res) {
    	// send home.html in response to any other uncaught request
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};
