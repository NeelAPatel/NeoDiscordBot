/* 
commands for bash: 
$ sudo apt install nodejs-legacy
*/
//Set up discord api
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./discordAuth.json');

//Set up twitter api
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var count = 0;



var fs = require("fs"),
    path = require("path");

//var p = "../" // current directory
var p = "/mnt/c/Users/NeelP/Pictures/Screenshots"
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
    });
});


//Retrieve ImageLinks
//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
//https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/entities-object1

/*
Twitter.get('statuses/user_timeline', { screen_name: 'neelerita', count: 2 }, function (err, data, response) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //console.log(data);
    
    var array = data;

    //For EVERY TWEET in the array of tweets
    for(var index in array) {
        console.log('.................. TWEET START ................');
        var tweet = array[index];
        
        //For EVERY FIELDNAME in a tweet
        for(var fieldName in tweet) {
            var fieldValue = tweet[fieldName];
            //console.log(fieldName); //item name
            console.log(fieldName.retwe)
            //If the field name is entities
            if (fieldName == 'entities'){
                console.log("[FieldName]: " + fieldName);
                console.log(fieldValue); //item stuff
                for (var subField in fieldValue)
                {
                    console.log("[Field Value of " + fieldName + "]: " + subField);
                    if (subField == 'media')
                    {                   
                        console.log("YES SUBFIELD IS MEDIA\n");
                        console.log(fieldName + "\n"); // entities
                        console.log(fieldValue[0]);
                        console.log(subField[0]); 
                        
                    }
                }
            }
        }
        console.log('.................. TWEET END ................');
    }
  
    
 })
  
*/

//const Clarifai = require('clarifai');
//const dlImg = require('image-downloader');
//const path = require('path');
/*
const stream = Twitter.stream('statuses/filter', { track: "notrinap" });
stream.on('error', err => console.log(err));

stream.on('tweet', tweet => {
  if (tweet.retweeted || !tweet.entities.media || !tweet.entities.media[0]) return; // no image in tweet

  console.log(tweet.entities.media[0].media_url_https);

  /*
  predict(tweet.entities.media[0].media_url_https, (err, res) => {
    if (err) console.log(err);
    const newDir = dir + '/' + res[0].name;
    if (ls(dir).indexOf(res[0].name) === -1) mkdir(newDir);

    dlImg({
    url: tweet.entities.media[0].media_url_https,
      dest: path.join(__dirname, newDir) + '/' + res[0].name + '-' + tweet.user.screen_name + '.jpg',
      done: (err, filename, image) => {
        if (err) console.log(err);
        console.log('Image at: ' + filename);
      }
    });
  });
});*/



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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }