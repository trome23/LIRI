require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
console.log(process.argv);

var command = process.argv[2];
var input = process.argv[3];


switch(command) {
    case "spotify-this-song":
        if (input === undefined || input === null) {
            input= "The Sign";
        }    
        spotify.search({ type: 'track,artist', query: input, limit: 10}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            var itemArr = data.tracks.items;
            var song = itemArr[0];
            if(input === "The Sign") {
                for (var i = 0; i < itemArr.length; i++) {
                   if(itemArr[i].album.artists[0].name === "Ace of Base") {
                       song=itemArr[i];
                   }
                  
                }
            }
          
            console.log(JSON.stringify(song.album.artists[0].name, null, 2)); 
            console.log(JSON.stringify(song.name, null, 2)); 
            console.log(JSON.stringify(song.preview_url, null, 2)); 
            console.log(JSON.stringify(song.album.name, null, 2)); 
        });

        break;
}
