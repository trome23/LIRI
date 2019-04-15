require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function liri() {
    switch(command) {
        case "spotify-this-song": 
            if (input === undefined) {
                input= "The Sign, Ace of base";
            }          
            spotify.search({ type: 'track', query: input, limit: 3}) 
            .then(function(response) {       
                //console.log(response.tracks);    
                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log("Artists: " + response.tracks.items[i].artists[0].name); 
                    console.log("Song Title: "+ response.tracks.items[i].name); 
                    console.log("Song Preview: " + response.tracks.items[i].preview_url); 
                    console.log("Album: " + response.tracks.items[i].album.name);   
                    console.log("\n-------------");
                        
                }
            })          
            .catch(function(err) {
                return console.log('Error occurred: ' + err);
            });
            break;
        
        case "movie-this":
            if (input === undefined) {
                input= "Mr. Nobody";
            }   
            var apiKey= "trilogy";
            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&apikey=" + apiKey;
            
            axios.get(queryUrl)
            .then(function(response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                }
            )
            .catch(function (error) {
                console.log(error);
            });    
        break;

        case "concert-this":   
            var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
                
            axios.get(queryUrl)
            .then(function(response) {
                // console.log(response.data);
                console.log("Venue Name: " + response.data[0].venue.name);
                console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                console.log("Date of Event: " + moment(response.data[0].venue.datetime).format("MM/DD/YYYY"));
                }
            )
            .catch(function (error) {
                console.log(error);
            }); 
        break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                    return console.log(error);
                }
                //console.log(data);

                var dataArr = data.split(",");
                command = dataArr[0];
                input = dataArr[1];
                liri();
                console.log(dataArr);
        });
        break;
};
};

liri();
