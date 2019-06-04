exports.run = async(client, message, args, level) => {
    //External
    var msgFormat = require('../../modules/funcStatusMsg.js');
    const guildKey = `g-${message.guild.id}`;

    if (!(client.cmdDB.has(guildKey))){
        // if cmdDB does not have the key
        // this guild is not included in the module-command database
        // maybe leave a message? 
        message.channel.send("Error: CmdDB does not have guildKey")
    }
    else
    {   
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes("profile")){
        
            //For Error messages
            process.on('unhandledRejection', (e) => {
                console.log(e.stack)
                var msgFormat = require('../../modules/funcStatusMsg.js')
                msgFormat.err(message,"Error!", e.stack)});

            //Libraries
            const Discord = require("discord.js");
			const {promisify} = require("util");
			const fs = require("fs"),path = require("path");
            const readdir = promisify(require("fs").readdir);
            const SQLite = require("better-sqlite3");
            const sql = new SQLite('./userinfo.sqlite'); //setting the table
            
            // Part 1 : Setup ===============
            checkTBLUInfoExists(message,sql)
            checkTBLUIntroExists()
            prepCommands(client, message, sql)  
                        
            

            // Part 2 : Commands ==============
            if (!args[0])
                showFullProfile(client, message);
            else{
                switch(args[0]){
                    case "setbday":{
                        setBday(args, client, message);
                        break;
                    }
                    case "setintro":{
                        break;
                    }
                    default:{
                        //test if its a username
                        break;
                    }
                    
                }
            }
        }
        else
        {
            let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
            message.channel.send("currArrCmd does not have this command")
            message.channel.send(currArrCmds)
        }
    }

    
}

function checkTBLUInfoExists(message, sql){
    // Check if tables exist
    // Check for userinfo table
    const tblUInfo = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userInfo';").get();
    //const tblUIntro = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userIntro';").get();
    
    if (!tblUInfo['count(*)']){
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE userInfo (id TEXT PRIMARY KEY, userID INTEGER, userDisplay TEXT, bdayMonth INTEGER, bdayDate INTEGER, bdayYear INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_userInfo_id ON userInfo (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
        //message.channel.send("Table Built");
    }
}

function checkTBLUIntroExists(){

}

function prepCommands(client, message, sql){
    // And then we have two prepared statements to get and set the score data.
    client.getUser = sql.prepare("SELECT * FROM userInfo WHERE userID = ?");
    client.addUser = sql.prepare("INSERT OR REPLACE INTO userInfo (id, userID, userDisplay, bdayMonth, bdayDate, bdayYear) VALUES (@id, @userID, @userDisplay, @bdayMonth, @bdayDate, @bdayYear);");
    //message.channel.send("Command ALL runned.");
}

function getUserDetails(client, message){
    var thisUserDetails = client.getUser.get(message.author.id);
    if (!thisUserDetails){ // if this user doesn't exist, create one in memory, just in case.
        thisUserDetails = {
            id: `${message.guild.id}-${message.author.id}`,
            userID: message.author.id,
            userDisplay: message.member.displayName,
            bdayMonth: `-1`,
            bdayDate: `-1`,
            bdayYear: '-1111'
            }
    }
    return thisUserDetails;
}

async function showFullProfile(client, message){
    //client.addUser.run(thisUserDetails);
    var thisUserDetails = getUserDetails(client, message);

    message.channel.send(thisUserDetails.userDisplay);
    message.channel.send(`${thisUserDetails.bdayMonth} ${thisUserDetails.bdayDate} ${thisUserDetails.bdayYear}`);
    
    //message.channel.send(thisUserDetails);
    client.addUser.run(thisUserDetails);

   // let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
    // /message.channel.send("currArrCmd does not have this command")
    //message.channel.send(`This server ${message.guild.name} has the following module commands enabled:[ ${currArrCmds} ]`);
    //message.channel.send("cmdComplete");
}

function setBday(args, client, message){
    
    var moment = require('moment');

    if (!args[1]){
        message.channel.send("Error: Missing Date value. Use format YYYY-MM-DD")
        return;
    }
    else{
        var givenDate = moment(args[1],'MM-DD-YYYY', true);
        if (!(givenDate.isValid())){
            message.channel.send("Error: Invalid date. Use format YYYY-MM-DD\n Note: For now, Year does not matter.")
            return;
        }
    }

    // add to database
    message.channel.send("SUCCESS!!!")
    var givenDate = moment(args[1],'MM-DD-YYYY', true);
    var myDate = new Date();

    myDate.setMonth 
    var thisUserDetails = getUserDetails(client, message);
    thisUserDetails.bdayMonth = parseInt(givenDate.format('MM'),10);
    thisUserDetails.bdayDate = parseInt(givenDate.format('DD'), 10);
    thisUserDetails.bdayYear = parseInt(givenDate.format('YYYY'),10);
   
    message.channel.send(`${thisUserDetails.bdayMonth} ${thisUserDetails.bdayDate} ${thisUserDetails.bdayYear}`);
    client.addUser.run(thisUserDetails);
    
    
    
    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "profile",
    category: "Module-based Commands | requires enabling for each server",
    description: "allows user info stuff",
    usage: "!info help"
};