// code to read and set any environment variables with the dotenv package
require("dotenv").config();
// code to read and set any environment variables with the node-spotify-api package
var Spotify = require('node-spotify-api');
// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// access your keys information
var spotify = new Spotify(keys.spotify);
console.log(spotify);