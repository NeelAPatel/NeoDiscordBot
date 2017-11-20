/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
var fs = require("fs"),
    path = require("path");
var totalImages = 1;
//var p = "../" // current directory
//var p = "/mnt/c/Users/Neel/Pictures/Screenshots"
var p = "/Users/Neel/Pictures/Screenshots"

totalImages = 1;
fs.readdir(p, function(err, files) {
    if (err) {
        throw err;
    }

    files.map(function(file) {
        return path.join(p, file);
    }).filter(function(file) {
        return fs.statSync(file).isFile();
    }).forEach(function(file) {
        console.log("%s (%s)", file, path.extname(file));
        totalImages += 1;
    });
});


// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzcwNzk3MjA0MDY1MjIyNjU2.DMsTXg.r7vu_vfcawlkPJvvnYjWHFKQfaM';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content === '!ping') {
        // Send "pong" to the same channel




        message.channel.send('there are ' + totalImages + ' images');

        var randomVal = getRandomInt(1, totalImages + 1);
        var file = new Discord.Attachment();
        file.setAttachment('/Users/Neel/Pictures/Screenshots/Screenshot (' + randomVal + ').png');
        message.channel.send(file);
    }
});

// Log our bot in
client.login(token);

/** EXTRA FUNCTIONS  */


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}