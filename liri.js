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
// import random.txt
var random = ("./random.txt");
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
        console.log(random);
        break;
    
};