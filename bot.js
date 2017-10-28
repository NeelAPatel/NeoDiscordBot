

var totalImages = 1;
var fs = require("fs"),
    path = require("path");

//var p = "../" // current directory
//var p = "/mnt/c/Users/Neel/Pictures/Screenshots"
var p = "/Users/Neel/Pictures/Screenshots"
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
        console.log("%s (%s)", file, path.extname(file));
        totalImages+=1;
    });
});


/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

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
    message.channel.send('pong');
    message.channel.send(totalImages);
    
    var randomVal = getRandomInt(1,totalImages+1);
    var file = new Discord.Attachment();
    file.setAttachment('/Users/Neel/Pictures/Screenshots/Screenshot ('+randomVal+').png');
    message.cha
  }
});

// Log our bot in
client.login(token);


/*
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':{
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            }
            //!notrinagasm
            case 'notrinagasm':{
                bot.sendMessage({
                    to: channelID,
                    message: 'Hi Rina'
                })
            break;
            }
            case 'image':{
                var randomVal = getRandomInt(1,17+1);
                bot.sen
                bot.sendMessage({
                    to:channelID,
                    message: 'Hello'
                })
                bot.uploadFile({
                    
                    to:channelID,
                    message:'Running uploadfile...'+ randomVal + 'hi',
                    file: '/mnt/c/Users/NeelP/Pictures/Screenshots/Screenshot ('+randomVal+').png'
                    //filename: '/mnt/c/Users/NeelP/Pictures/Screenshots/Screenshot (9).png'

                }) 
            break; 
            }
            // Just add any case commands if you want to..

         }
     }
});
*/



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }