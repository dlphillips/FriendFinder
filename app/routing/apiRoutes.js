var path = require("path");
// get data
var friends = require("../data/friends.js");

module.exports = function(app) {
    var bodyParser = require("body-parser");
    // listen for get request to /api/friends and send json of data from /data/friends.js
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // listen for post request to /api/friends
    app.post("/api/friends", function(req, res) {
        // save posted data to newPerson
        var newPerson = req.body;

        // initialze variables
        var newScores = [];
        var totalDifference = 0;
        var closeFriend = "";
        var lowScore = 0;
        var friendImage = "";
        var friendId = 0;

        // read scores into new array for comparison
        for (var k = 0; k < 10; k++) {
            newScores[k] = parseInt(newPerson.scores[k]);
        }

        // iterate through friends data and compare to each
        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            console.log('Comparing '+newPerson.name+' with '+friends[i].name);
            for (var j = 0; j < 10; j++) {
                totalDifference = totalDifference + Math.abs(newScores[j] - parseInt(friends[i].scores[j]));
            }
            // set initial values for friend with closest score
            if (i === 0) {
                closeFriend = friends[i].name;
                lowScore = totalDifference;
                friendImage = friends[i].photo;
            }
            // if current frined is better match, replace varaiables with new friend
            if (totalDifference < lowScore) {
                lowScore = totalDifference;
                closeFriend = friends[i].name;
                friendImage = friends[i].photo;
                friendId = i;
            }

        }

        // send json of closest matching friend 
        res.json(friends[friendId]);

        // add the new survey results to the friends array
        friends.push(newPerson);

    });
};
