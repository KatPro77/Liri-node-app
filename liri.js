require("dotenv").config();

//required variables
var fs = require("fs");
var searchArg = process.argv[3];
var nodeArg = process.argv[2];

//spotify keys
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
            console.log("This song is from the artist(s): " + data.tracks.items[8].artists[0].name);
            console.log("This song's name is: " + data.tracks.items[8].name);
            console.log("Preview url for this track: " + data.tracks.items[8].preview_url);
            console.log("This song is from the album: " + data.tracks.items[8].album.name);
            console.log("=======================================================");
        });
      } else {
            // user's song choice, or from random.txt
            spotify.search({ type: 'track', query: searchArg }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("This song is from the artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("This song's name is: " + data.tracks.items[0].name);
                console.log("Preview url for this track: " + data.tracks.items[0].preview_url);
                console.log("This song is from the album: " + data.tracks.items[0].album.name);
            });
        }
    }

    getSongs();

// // function that takes two parameters to run the app, the node command, and then what the user searches
var chooseCmd = function (nodeCmd, searchArg) {

    // switch case to identify which command user entered, and then runs corresponding function
    switch (nodeCmd) {
        case 'spotify-this-song':
            getSongs(searchArg); // passes what user wants to search, as a parameter in its function
            break;
        // case 'movie-this':
        //     searchOmdb(searchQuery); // passes what user wants to search, as a parameter in its function
        //     break;
        // case 'do-what-it-says':
        //     readData();
        //     break;
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


