require("dotenv").config();

let keys = require("./keys.js");
let fs = require(`fs`);
let axios = require(`axios`);
let Spotify = require(`node-spotify-api`);

// ////////////////////////////////////////////////////////////////////////

let spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

let search = process.argv[2];
let term = process.argv.slice(3).join(" ");

// ////////////////////////////////////////////////////////////////////////

let getArtist = function(artist) {
  return artist.name;
};

let spotifyThis = function(songName) {
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    let songs = data.tracks.items;
    for (let i = 0; i < songs.length; i++) {
      console.log("Artist(s): " + songs[i].artists.map(getArtist));
      console.log(`Song Name: ${songs[i].name}`);
      console.log(`Preview Song: ${songs[i].preview_url}`);
      console.log(`Album: ${songs[i].album.name}`);
      console.log(`------------------------------------------------`);
    }
  });
};

// ////////////////////////////////////////////////////////////////////////
let movieThis = function(movieName){
    let URL =  "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=15cd8687&=trilogy";
    axios.get(URL).then(function(response){
        console.log(`-----------------------------------------------------------`);
        console.log(`Title: ` + response.data.Title);
        console.log(`Released: ` + response.data.Year);
        console.log(`IMDB Rating: ` + response.data.imdbRating + `/10`);
        console.log(`Rotten Tomatoes Rating: ` + response.data.Ratings[1].Value);
        console.log(`Country: ` + response.data.Country);
        console.log(`Language: `+ response.data.Language);
        console.log(`Plot: ` + response.data.Plot);
        console.table(`Actors: ` + response.data.Actors);
        console.log(`-----------------------------------------------------------`);
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
   
};

// ////////////////////////////////////////////////////////////////////////
let doWhatItSays = function(){

fs.readFile(`random.txt`, `utf8`, function(err, data){
    if(err) throw err;
    console.log(data);

    let arr = data.split(`,`);

    if(arr.length == 2){
        
    }
})

}

// ////////////////////////////////////////////////////////////////////////

if (!search) {
  spotifyThis(`The Sign`);
}
if (search === `spotify-this`) {
  spotifyThis(term);
} else if (search === `movie-this`) {
  movieThis(term);
} else if (search === `do-what-it-says`){
    doWhatItSays();
} else {
  console.log(`Liri needs some help!`);
}
