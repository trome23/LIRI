require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
console.log(process.argv);

var command = process.argv[2];
var input = process.argv[3];


switch(command) {
    case "spotify-this-song": 
        if (input === undefined) {
            input= "The Sign";
        }          
        spotify.search({ type: 'track', query: input, limit: 5}) 
        .then(function(response) {       
            // console.log(response.tracks);    
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("Artists: " + response.tracks.items[i].artists[0].name); 
                console.log("Song Title: "+ response.tracks.items[i].name); 
                console.log("Song Preview: " + response.tracks.items[i].preview_url); 
                console.log("Album: " + response.tracks.items[i].album.name);   
                console.log("\n-------------");
                    
            }
        })          
        .catch(function(err) {
            console.log(err) 
          });
        
        

        break;
    
}
