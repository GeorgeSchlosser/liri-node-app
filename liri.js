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
// var inputString = process.argv;

// specify which functions to execute
// var command = inputString[2];
var commandInput = process.argv.slice(2, 3);
// console.log(commandInput);

// variable to take value w/n commandInput out of its array
var command = commandInput[0];
// console.log(command);

// empty variable to hold artist/song/movie to search
// var searchItem = "";

// variable containing searchterms
var commandArgs = process.argv.slice(3);
console.log(commandArgs);

// take values w/n commandArgs out of its array
// var args = function () {
//     for (let i = 0; i < commandArgs.length; i++) {
//         console.log(commandArgs[i])
//     }
// };
// console.log(args);

// empty variable for holding arguments
var args = "";

// loop through all words in commandArgs & concatinate into a searchable string
for (var i = 0; i < commandArgs.length; i++) {

    if (i > 0 && i < commandArgs.length) {
      args = args + " " + commandArgs[i];
    }
    else {
      args += commandArgs[i];
  
    }

}
console.log(args);

// use levelTwoOmdbInteractive.js loop method?

// tell liri what to do
switch (command) {
    case "concert-this":
        console.log("look up concerts");
        break;
    case "spotify-this-song":
        // console.log("search a song");
        spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data); 
        });
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