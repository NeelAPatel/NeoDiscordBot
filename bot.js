//Part 1: Discord bot set up
//=================================================
// Import the discord.js module
const Discord = require('discord.js');
const client = new Discord.Client(); // Create an instance of a Discord client

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'MzcwNzk3MjA0MDY1MjIyNjU2.DMsTXg.r7vu_vfcawlkPJvvnYjWHFKQfaM';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('I am ready!');
});

const prefix = '!!';
var commandCounter = 1;

//Part 2: SQL specifics
//=================================================
const sql = require ('sqlite');
sql.open("./commandData.sqlite");


//var pathToPicFolder = "C:/Users/Neel/OneDrive/Documents/DiscordBot/PadawanClaudia"
// C:\Users\Neel\OneDrive\Documents\DiscordBot\PadawanClaudia
//var p = "../" // current directory
//var p = "/mnt/c/Users/Neel/Pictures/Screenshots"
//var p = "/Users/Neel/Pictures/Screenshots"
//var p = "/Users/Neel/Downloads/claudiaGasm/PadawanClaudia"
//var totalImages = 1;
//var arrPaths = [];


/* claudiaGasm Section */
var clGpathToPictures;
var clGisRefreshed = 0;
var clGtotalImages = 1;
var clGarrPath = [];
var fs = require("fs"),
    path = require("path");



    
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;  // Ignore if it doesn't start with prefix
    else if (message.channel.type === "dm") return;  // Ignore DM channels.
    else if (message.author.bot) return;             // Ignore if author is a bot
    else{
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command === 'testing'){
            message.channel.send('testing recieved');
            var a = args[0];
            var b = args[1];
            var c = args[2];
            message.reply(`Hello ${message.author.username}, I see you're a ${a} year old ${b} from ${c}. Wanna date?`);
            return;
        }


        if (command === 'activateclaudiagasm'){
            message.channel.send('activation recieved');
            var userInputtedPath = args[0];
            if (userInputtedPath === 'undefined'){
                message.reply(`Error: Parameter missing.`);
            }
            else{
                message.reply(`activating claudiaGasm with Path: ${userInputtedPath}`);
                var totalImages = 1;
                var arrPaths = [];
                var pathToPicFolder = userInputtedPath;
                /*
                if (!fs.existsSync(pathToPicFolder)) {
                    message.channel.send('Error 404: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.');
                    return;
                }

                fs.readdirsync(pathToPicFolder, function(err,files){
                    if (err) {
                        throw err;
                    }
                
                    files.map(function(file){
                        return path.join(pathToPicFolder, file);
                    }).filter(function (file){
                        return fs.statSync(file).isFile();
                    }).forEach(function(file){
                        arrPaths.push(file);
                        totalImages += 1;
                        console.log("%s (%s)", file, path.extname(file));
                    })    
                })*/



                const testFolder = pathToPicFolder + '/';
                const fs = require('fs');

                fs.readdirSync(testFolder).forEach(file => {
                console.log(pathToPicFolder + '/' + file);
                var filePath = pathToPicFolder + '/' + file;
                arrPaths.push(filePath);
                totalImages += 1;
                });


                message.channel.send(totalImages);

                var guildID = message.guild.id;
               

                /*
                SQL TABLE 
                ============
                guildID  |  isCLGActivated | clgTotalImages | pathToPicFolder 
                */
                /*
                sql.run(`UPDATE commandData SET isCLGActivated = ${1}, clgTotalImages = ${totalImages} , clgPathToPicFolder = ${pathToPicFolder} WHERE guildID = ${guildID}`).then (row => {
                    if (!row){
                        sql.run("INSERT INTO commandData (guildID, isCLGActivated, clgTotalImages, clgPathToPicFolder) VALUES (?, ?, ?, ?)", [guildID, 1, totalImages, pathToPicFolder]);
                    }
                    else
                    {
                        sql.run(`UPDATE commandData SET isCLGActivated = ${1}, clgTotalImages = ${totalImages} , clgPathToPicFolder = ${pathToPicFolder} WHERE guildID = ${guildID}`);
                    }

                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS commandData (guildID TEXT, isCLGActivated INTEGER, clgTotalImages INTEGER, clgPathToPicFolder TEXT)").then(() => {
                        sql.run("INSERT INTO commandData (guildID, isCLGActivated, clgTotalImages, clgPathToPicFolder) VALUES (?, ?, ?, ?)", [guildID, 1, totalImages, pathToPicFolder]);
                    })
                });*/
                
                sql.run(`UPDATE commandData SET isCLGActivated = ${1}, clgTotalImages = ${totalImages} , clgPathToPicFolder = ${pathToPicFolder}, clgArrOfPaths = ${arrPaths} WHERE guildID = ${guildID}`).then (row => {
                    if (!row){
                        sql.run("INSERT INTO commandData (guildID, isCLGActivated, clgTotalImages, clgPathToPicFolder, clgArrOfPaths) VALUES (?, ?, ?, ?, ?)", [guildID, 1, totalImages, pathToPicFolder, arrPaths]);
                    }
                    else
                    {
                        sql.run(`UPDATE commandData SET isCLGActivated = ${1}, clgTotalImages = ${totalImages} , clgPathToPicFolder = ${pathToPicFolder}, clgArrOfPaths = ${arrPaths} WHERE guildID = ${guildID}`);
                    }

                }).catch(() => {
                    sql.run("CREATE TABLE IF NOT EXISTS commandData (guildID TEXT, isCLGActivated INTEGER, clgTotalImages INTEGER, clgPathToPicFolder TEXT, clgArrOfPaths BLOB)").then(() => {
                        sql.run("INSERT INTO commandData (guildID, isCLGActivated, clgTotalImages, clgPathToPicFolder, clgArrOfPaths) VALUES (?, ?, ?, ?, ?)", [guildID, 1, totalImages, pathToPicFolder, arrPaths]);
                    })
                });

                
                message.channel.send(`ClaudiaGasm activated`);
                return;
            }
            return;
        } // end activateClaudiaGasm

        if (command === 'claudiagasm'){
            //if our guild id does not exist in the table
                // throw error saying we have not activated this command yet. 
            //if isActivated = 0
                // throw error saying we have not activated this command yet.
            //else
            /*
                get arrayOfPaths, totalPaths, and directoryPath
                run random file search
                send message
            */
           // message.channel.send("running claudiaGasm");
            
//            var getItemResolved = false;


            message.channel.send("Starting  getItem");
            sql.get(`SELECT * FROM commandData WHERE guildID ="${message.guild.id}"`).then(row => {
                if (!row) return message.reply("ERROR: Your current level is 0");
                message.reply(`Your current level is ${row.clgTotalImages}`);
                var rcvRowPaths = 
                message.reply(`ArrayOfPaths = ${row.clgArrOfPaths}`)
              });
             
            // close the database connection
            //db.close();
            /*
            var file = new Discord.Attachment();
            var picturePath = arrPaths[Math.floor(Math.random()*arrPaths.length)];
            try {
               fs.accessSync(picturePath);
            } catch (e) {
              fs.mkdirSync(picturePath);
              message.channel.send('Error 404X: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.')
            }
    
            file.setAttachment(picturePath);
            message.channel.send(file);
            */



            message.channel.send("claudiaGasm end");

           
            return;
        }

        if (command === 'refreshclaudiagasm'){
            return;
        }

    }


}) // client on

    /*if (message.content === "!refreshFolder"){
        
        totalImages = 1;
        arrPaths = [];
        if (!fs.existsSync(pathToPicFolder)) {
            message.channel.send('Error 404: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.');
            return;
        }
           
    
        fs.readdir(pathToPicFolder, function(err,files){
            if (err) {
                throw err;
            }
        
            files.map(function(file){
                return path.join(pathToPicFolder, file);
            }).filter(function (file){
                return fs.statSync(file).isFile();
            }).forEach(function(file){
                arrPaths.push(file);
                totalImages += 1;
                console.log("%s (%s)", file, path.extname(file));
            })    
        })
        
        isRefreshed = 1;
        message.channel.send('Folder has been refreshed!');
    }
});
*/




// Log our bot in
client.login(token);

/** EXTRA FUNCTIONS  */


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}