// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.static(path.join(__dirname, './app/public')));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// =============================================================
// ===As a rule, keep the stuff above at the top of the file===
// =============================================================

// EXTREMELY important to have these AFTER body parser statements
// Require routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// turn port on 
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
