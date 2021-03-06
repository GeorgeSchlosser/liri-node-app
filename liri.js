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
// moment
var moment = require("moment")
 
// CLI FUNCTIONS
// ================================================================================
// take in first command line argument
var commandInput = process.argv.slice(2, 3);


// variable to take value w/n commandInput out of its array
var command = commandInput[0];
// console.log(command);

// variable containing arguments for searchterms
var commandArgs = process.argv.slice(3);
// console.log(commandArgs);


// empty variable for holding arguments
var args = "";


// loop through all words in commandArgs & concatinate into a searchable string w/ spaces
for (var i = 0; i < commandArgs.length; i++) {

    if (i > 0 && i < commandArgs.length) {
      args = args + " " + commandArgs[i];
    }
    else {
      args += commandArgs[i];
  
    }

}
// console.log(args);


//liri commands & functions
// future goal: modularize
switch (command) {
    case "concert-this":

        axios.get("https://rest.bandsintown.com/artists/" + args + "/events?app_id=codingbootcamp").then(function(response) {


            // var to format w/ Moment JS
            // console.log(response.data[0])
            var date = moment(response.data[0].datetime).format('MM/DD/YYYY')
            console.log("Go see " + response.data[0].lineup[0]+ " at " + response.data[0].venue.name + " in " + response.data[0].venue.city + " on " + date + "!");
        })
        .catch(function (error) {
            console.log(error);
        });
        break;
    case "spotify-this-song":
        // song search defaults to "The Sign"
        if (args === "") {
            var args = "the sign ace of base"
        };

        // this way was giving me problems, saving to investigate later
        // console.log("search a song");
        // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        //     if (err) {
        //       return console.log('Error occurred: ' + err);
        //     }
           
        //   console.log(data.items); 
        // });

        spotify
            .search({ type: 'track', query: args, limit: 1})
            .then((resp) => {
             //unpack response
            var resp = resp.tracks.items[0];
            // required information
            var artistsResp = resp.artists[0].name;
            console.log("Preformed by " + artistsResp);
            var songResp = resp.name;
            console.log("'" + songResp + "'");
            var urlResp = resp.external_urls.spotify;
            console.log("Listen to the song HERE: " + urlResp);
            var albumResp = resp.album.name;
            console.log("Off of the album, " + albumResp);
            })
            .catch((err) => {
            console.log("I havent heard of that one :(");
            });
        break;
    case "movie-this":
         // defaults to Mr. Nobody
        if (args === "") {
            var args = "mr nobody"
        };
        
        axios.get("http://www.omdbapi.com/?t="+args+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            
            // title
            console.log("Movie Title: " + response.data.Title);
            // release year
            console.log("Year Released: " + response.data.Year);
            // imdb rating
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            // RT rating, what to do if rating isn't present ex: tromeo and juliet
            console.log("Rotten Tomatoes Critic Score: " + response.data.Ratings[1].Value);
            // Country produced in
            console.log("Country Produced In: " + response.data.Country);
            // Language
            console.log("Language(s): " + response.data.Language);
            // plot
            console.log("Plot Summary: " + response.data.Plot);
            // actors
            console.log("Cast: " + response.data.Actors);
        })
        .catch(function (error) {
            console.log(error);
        });
        break;
    case "do-what-it-says":
        // console.log(random);
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            }

            var randArr = data.split(",");
            
            spotify.search({ type: 'track', query: randArr[1], limit: 1})

            .then((resp) => {
                //unpack response
               var resp = resp.tracks.items[0];
               // required information
               var artistsResp = resp.artists[0].name;
               console.log("Preformed by " + artistsResp);
               var songResp = resp.name;
               console.log("'" + songResp + "'");
               var urlResp = resp.external_urls.spotify;
               console.log("Listen to the song HERE: " + urlResp);
               var albumResp = resp.album.name;
               console.log("Off of the album, " + albumResp);
               })


          
            // We will then print the contents of data
            console.log(data);
            // code adpated from read.js
        });
        break;
    default:
        console.log("Invalid Command");
};