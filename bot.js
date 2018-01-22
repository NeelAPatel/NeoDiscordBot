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
                totalImages += 1;
                })









                message.channel.send(totalImages);

                var guildID = message.guild.id;
                
                
                sql.run("CREATE TABLE IF NOT EXISTS commandData (guildID TEXT, isActivated INTEGER, arrOfPaths BLOB, totalPaths INTEGER, directoryPath TEXT)").then(() => {
                    sql.run (`INSERT INTO commandData (guildID, isActivated, arrOfPaths, totalpaths, directoryPath) VALUES (?,?,?,?,?)`, [guildID,1, arrPaths,totalImages,pathToPicFolder]);
                  });


                
                message.channel.send(`ClaudiaGasm activated ${guildID} stuff ${pathToPicFolder}`);
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
            
            var getItemResolved = false;
            var pathToPicFolder;
            var arrPaths = [];
            var totalImages = 1;


            message.channel.send("Starting  getItem");
            while (!getItemResolved){
                sql.get(`SELECT * FROM commandData WHERE guildID = "${message.guild.id}"`).then(row => {
                    if (!row){
                        return message.reply("ERROR 1");
                    }
                    pathToPicFolder = row.directoryPath;
                    getItemResolved = true;
                });
            }
            message.channel.send("ending getItem");
        /*  
            if (!fs.existsSync(pathToPicFolder)) {
                message.channel.send('Error 404: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.');
                return;
            }
            message.channel.send(pathToPicFolder);


            message.channel.send("Starting  Looping");
            let directoryLooping = false;

            while(!directoryLooping){
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
                        console.log("%s", file, path.extname(file));
                    })    
                })

                directoryLooping = true;
            }
            message.channel.send("Looping end");
            

            /*
            sql.get(`SELECT * FROM commandData WHERE guildID = "${message.guild.id}"`).then(row =>{
                if (!row){
                    return message.reply("ERROR 1");
                }
               // message.reply(`FIELD IS ${row.isActivated}  -  ${row.directoryPath}`);
                pathToPicFolder = row.directoryPath;
                if (!fs.existsSync(pathToPicFolder)) {
                    message.channel.send('Error 404: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.');
                    return;
                }

                message.channel.send( pathToPicFolder);
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
                        console.log("%s", file, path.extname(file));
                    })    
                })

                console.log ("\nINSIDE Found %d pictures. %d\n", totalImages, arrPaths.length);
                message.channel.send("claudiaGasm end");
            });

            console.log ("\nOUTSIDE Found %d pictures. %d\n", totalImages, arrPaths.length);    */         
            //message.channel.send( pathToPicFolder);
                

            //totalImages = 1;
            //arrPaths = [];
         
               
            /*
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
                   // console.log("%s (%s)", file, path.extname(file));
                })    
            })



            console.log ("Found %d pictures. %d", totalImages, arrPaths.length);




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


/*
// Create an event listener for messages
    client.on('message', message => {
    // If the message is "ping"
    if (message.content === '!claudiaGasm1') {
        // Send "pong" to the same channel

        if (isRefreshed != 1){
            message.channel.send('Folder has not been refreshed. Cannot continue.');
            return;
        }


        // message.channel.send('there are ' + totalImages + ' images');
        console.log("\nCOMMAND HAS BEEN USED %dX!\n", commandCounter);
        commandCounter++;
       // var randomVal = getRandomInt(1, totalImages + 1);
        var file = new Discord.Attachment();
        var picturePath = arrPaths[Math.floor(Math.random()*arrPaths.length)];
        try {
           fs.accessSync(picturePath);
        } catch (e) {
          fs.mkdirSync(picturePath);
          message.channel.send('Error 404: Sorry. Please try again, and contact @Neel#2970 and he will fix me as soon as possible. Thank you.')
        }

        file.setAttachment(picturePath);
        message.channel.send(file);
    }
    else if (message.content === "!refreshFolder"){
        
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