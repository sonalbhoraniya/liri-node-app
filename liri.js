require("dotenv").config();
var axios = require("axios");
var fs = require('fs');
var util = require('util');
var Spotify = require("node-spotify-api");
var bands = require('bandsintown');
var moment = require("moment");
var request = require("request");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Store all of the arguments in an array
var nodeArgs = process.argv;

// // Create an empty variable for holding the band name
var command = process.argv[2];
var searchTerm = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        searchTerm = searchTerm + "+" + nodeArgs[i];
    } else {
        searchTerm += nodeArgs[i];

    }
}

switch (command) {
    case "spotify-this-song":
        songSearch();
        break;

    case "movie-this":
        movieSearch();
        break;

    case "concert-this":
        concertSearch();
        break;

    case "do-what-it-says":
        readSearch();
        break;
}

function concertSearch() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        var pbody = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            pbody.forEach(function (element) {
                addToLog("Venue name: " + element.venue.name);
                addToLog("Venue location: " + element.venue.city + ", " + element.venue.region);
                addToLog("Date of event: " + moment(element.datetime).format("MM/DD/YYYY"));
            })
        }
    })
}

function songSearch() {
    if (searchTerm === "") {
        searchTerm = "The Sign";
    }
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        }
        addToLog("------")
        addToLog("Artist Name: " + util.inspect(data.tracks.items[0].artists[0].name, { showHidden: true, depth: null }))
        addToLog("Track Name: " + util.inspect(data.tracks.items[0].name, { showHidden: true, depth: null }))
        addToLog("Preview Link: " + util.inspect(data.tracks.items[0].preview_url, { showHidden: true, depth: null }))
        addToLog("Album Name: " + util.inspect(data.tracks.items[0].album.name, { showHidden: true, depth: null }))
    })
}

function movieSearch() {
    if (searchTerm === "") {
        searchTerm = "Mr. Nobody";
    };
    axios.get("https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
           // addToLog()
            addToLog("Title of the movie: " + response.data.Title);
            addToLog("Year the movie came out: " + response.data.Year);
            addToLog("IMDB Rating of the movie: " + response.data.imdbRating);
            addToLog("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            addToLog("Language of the movie: " + response.data.Language);
            addToLog("Plot of the movie: " + response.data.Plot);
            addToLog("Actors in the movie: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function readSearch() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        command = dataArr[0];

        for (var i = 1; i < dataArr.length; i++) {

            if (i > 1 && i < dataArr.length) {
                searchTerm = searchTerm + "+" + dataArr[i];
            } else {
                searchTerm += dataArr[i];

            }
        }

        if (command == "spotify-this-song") {
            songSearch();
        }
    })
}

function addToLog(log) {
    console.log(log); 
    fs.appendFile("log.txt", log + '\n', function(err) {
        if (err) return display("Error lodding data to file: " + err);
    })
}
