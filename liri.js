require("dotenv").config();

//required variables
var fs = require("fs");
var searchArg = process.argv[3];
var nodeArg = process.argv[2];
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var getSongs = function () {

    if (!searchArg) {
        //default song "Freedom"
        spotify.search({ type: 'track', query: 'Freedom' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("===================================");
            console.log("This song is from the artist(s): " + data.tracks.items[8].artists[0].name);
            console.log("This song's name is: " + data.tracks.items[8].name);
            console.log("Preview url for this track: " + data.tracks.items[8].preview_url);
            console.log("This song is from the album: " + data.tracks.items[8].album.name);
            console.log("===================================");
        });
    } else {
        // user's song choice, or from random.txt
        spotify.search({ type: 'track', query: searchArg }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("===================================");
            console.log("This song is from the artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("This song's name is: " + data.tracks.items[0].name);
            console.log("Preview url for this track: " + data.tracks.items[0].preview_url);
            console.log("This song is from the album: " + data.tracks.items[0].album.name);
            console.log("===================================");
        });
    }
}

// getSongs();

var getMovies = function(movieName) {

//OMDB API - http://www.omdbapi.com/?i=tt3896198&apikey=67b54177
//http://www.omdbapi.com/?apikey=[yourkey]&
request("http://www.omdbapi.com/?t=" + movieName + "&apikey=67b54177&", function (err, response, body) {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    var jsonData = JSON.parse(body);
    console.log("========================================");
    console.log("Title: " + jsonData.Title);
    console.log("Year: " + jsonData.Year);
    console.log("Rated: " + jsonData.Rated);
    console.log("IMDB Rating: " + jsonData.imdbRating);
    console.log("Country: " + jsonData.Country);
    console.log("Language: " + jsonData.Language);
    console.log("Plot: " + jsonData.Plot);
    console.log("Actors: " + jsonData.Actors);
    console.log("Rotten tomatoes rating: " + jsonData.tomatoRating);
    console.log("Rotten tomatoes URL: " + jsonData.tomatoURL);
    console.log("========================================");
});

}

// getMovies();

// function to read text from txt file
var readData = function() {
    fs.readFile("./random.txt", "utf8", function(err, data) {

       if (err) {
            return console.log(err);
        }

        var dataArr = data.split(",");

        if (dataArr.length == 2) {
            chooseCmd(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            chooseCmd(dataArr[0]);
        }
    });
};


// // function that takes two parameters to run the app, the node command, and then what the user searches
var chooseCmd = function (nodeCmd, searchArg) {

    // switch case to identify which command user entered, and then runs corresponding function
    switch (nodeCmd) {
        case 'spotify-this-song':
            getSongs(searchArg); 
            break;
        case 'movie-this':
            getMovies(searchArg); 
            break;
        case 'do-what-it-says':
            readData();
            break;
        default:
            console.log("Sorry, LIRI cannot help you!");
            console.log(' ----- spotify-this-song\n ----- movie-this\n ----- do-what-it-says\n');
            break;
    }
};

// run application function
var runThis = function (argOne, argTwo) {
    chooseCmd(argOne, argTwo);
};

// call to run app
runThis(nodeArg, searchArg);


