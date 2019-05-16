// INITIALIZATIONS
// ================================================================================
// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code to read and set any environment variables with the node-spotify-api package
var Spotify = require('node-spotify-api');
// code to read and set any environment variables with the axios package
var axios = require("axios");
// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// Core node package for reading and writing files
var fs = require("fs");
// access your keys information
var spotify = new Spotify(keys.spotify);
// console.log(spotify); checking to see files are communicating

// PACKAGE FUNCTIONS
// ================================================================================

// CLI FUNCTIONS
// ================================================================================
// take in command line arguments
var inputString = process.argv;

// specify which functions to execute
var command = inputString[2];

// empty variable to hold artist/song/movie to search
var searchItem = "";
// use levelTwoOmdbInteractive.js loop method?

// tell liri what to do
switch (command) {
    case "concert-this":
        console.log("look up concerts");
        break;
    case "spotify-this-song":
        console.log("search a song");
        break;
    case "movie-this":
        console.log("search a movie");
        break;
    case "do-what-it-says":
        // console.log(random);
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
          
            // We will then print the contents of data
            console.log(data);
            // code adpated from read.js
        });
        break;
        default:
            console.log("Invalid Command");
};