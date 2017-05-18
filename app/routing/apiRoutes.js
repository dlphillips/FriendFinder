var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
    var bodyParser = require("body-parser");
    app.get("/api/friends", function(req, res) {
        // res.sendFile(path.join(__dirname, "/../data/friends.js"));
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        var newPerson = req.body;

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


        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            console.log('Comparing '+newPerson.name+' with '+friends[i].name);
            for (var j = 0; j < 10; j++) {
                totalDifference = totalDifference + Math.abs(newScores[j] - parseInt(friends[i].scores[j]));
            }
            if (i === 0) {
                closeFriend = friends[i].name;
                lowScore = totalDifference;
                friendImage = friends[i].photo;
            }

            if (totalDifference < lowScore) {
                lowScore = totalDifference;
                closeFriend = friends[i].name;
                friendImage = friends[i].photo;
                friendId = i;
            }

        }
        console.log('*******************');
        console.log(closeFriend, lowScore, friendImage);
        console.log('*******************');

        res.json(friends[friendId]);

        // add the user sent to the friends array
        friends.push(newPerson);

    });
};
