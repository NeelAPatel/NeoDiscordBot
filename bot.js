
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
//Retrieve ImageLinks
//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
//https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/entities-object1
Twitter.get('statuses/user_timeline', { screen_name: 'notrinap', count: 25 }, function (err, data, response) {
    //console.log(data)
    for (var a in data)
    {
        count = count + 1;
        console.log(count);
    }
    
  })
  
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

            case 'notrinagasm':{
                bot.sendMessage({
                    to: channelID,
                    message: 'Hi Rina'
                })
            break;
            }
            // Just add any case commands if you want to..

         }
     }
});