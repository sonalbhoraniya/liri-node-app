# liri-node-app

### Overview

This app is LIRI.  It is a Language Interpretation and Recognition Interface and a command line node app that takes in parameters and gives back data.  

LIRI can search Spotify for songs, Bands in Town for concerts and OMDB for movies.  By putting in one of three commands and any band, song or movie name, a user can quickly obtain the relevant information on each one. 

### How the App is Organized

This app utilizes Node packages for ease of obtaining information.  It consists of four functions that each use a Node package to get the relevant information needed.  For example, one function, "spotify-this-song" function uses the Node-Spotify-API in order to query for the song entered by the user.  

Each function's output is logged to a separate file to provide for search history. 

### How to Use this App

This app is seamless and each search is simple.  The user simply needs to type in one of the following commands depending on what they want to search: 
* 'node liri.js spotify-this-song '<song name here>'' - this will search spotify for a song and provide the following information for the artist or band name specified: 
    * Artist(s)
    * Song's Name
    * Preview link of the song from Spotify
    * Album that the song is from
    * *Note, if a band or artist is not entered, then information for 'The Sign' by Ace of Base will appear by default.*
* 'node liri.js concert-this '<artist/band name here>'' - this will search Bands in Town for events for the artist or band name specified: 
    * Name of the venue
    * Venue location
    * Date of the Event
* 'node liri.js movie-this '<movie name here>''- this will search OMDB for a movie and provide the following information for the movie name specified: 
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * *Note, if a movie is not entered, then information for 'Mr. Nobody' will appear by default.*
* 'node liri.js do-what-it-says' - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

### Screenshots demonstrating the app's functionality 



### Technologies Used 
* Axios
* fs
* util
* Node-Spotify-API
* BandsinTown API
* Moment
* request


