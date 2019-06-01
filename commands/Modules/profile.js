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
                        
            let thisUserDetails = client.getUser.get(message.author.id);
            if (!thisUserDetails){ // if this user doesn't exist, create one in memory, just in case.
                thisUserDetails = {
                    id: `${message.guild.id}-${message.author.id}`,
                    userID: message.author.id,
                    userDisplay: message.member.displayName,
                    bdayMonth: `None`,
                    bdayDate: `-1`
                  }
            }

            // Part 2 : Commands ==============
            if (!args[0])
                showFullProfile(client, message, thisUserDetails);
            else{
                switch(args[0]){
                    case "setbday":{
                        setBday(args, client, message, thisUserDetails);
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
        sql.prepare("CREATE TABLE userInfo (id TEXT PRIMARY KEY, userID INTEGER, userDisplay TEXT, bdayMonth TEXT, bdayDate INTEGER);").run();
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
    client.addUser = sql.prepare("INSERT OR REPLACE INTO userInfo (id, userID, userDisplay, bdayMonth, bdayDate) VALUES (@id, @userID, @userDisplay, @bdayMonth, @bdayDate);");
    //message.channel.send("Command ALL runned.");
}

async function showFullProfile(client, message, thisUserDetails){
    //client.addUser.run(thisUserDetails);


    message.channel.send(thisUserDetails.userDisplay);
    message.channel.send(thisUserDetails.bdayMonth);
    message.channel.send(thisUserDetails.bdayDate);
    client.addUser.run(thisUserDetails);

   // let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
    // /message.channel.send("currArrCmd does not have this command")
    //message.channel.send(`This server ${message.guild.name} has the following module commands enabled:[ ${currArrCmds} ]`);
    //message.channel.send("cmdComplete");
}

function setBday(args, client, message, thisUserDetails){
    
    if (!args[1] || !args[2]){
        message.channel.send("Missing arguments")
        return;
    }
    var userMonth = args[1].toLowerCase()
    var userDate = args[2]
    var usableMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    var months31 = ["jan", "mar",  "may",  "jul", "aug",  "oct",  "dec"]
    var months30 = [ "feb", "apr", "jun", "sep", "nov"]
    
    if (!usableMonths.includes(userMonth)){
        message.channel.send(`Error: Wrong month argument. \n Use one of the following as the month value: [${usableMonths}]` )
        return;
    }
    if (!(parseInt(userDate) >= 1 && parseInt(userDate) < 32))
    {
        message.channel.send("Error: date value out of range")
        return;
    }

    var condFeb = ((userMonth == usableMonths[1]) && (!(parseInt(userDate) >= 1 && parseInt(userDate) < 30)))
    var cond31 = (months31.includes(userMonth) && (!(parseInt(userDate) >= 1 && parseInt(userDate) < 32))) // if month is 31, but date is not in range
    var cond30 = (months30.includes(userMonth) && (!(parseInt(userDate) >= 1 && parseInt(userDate) < 31))) // if month is 31, but date is not in range
    

    if (condFeb || cond30 || cond31){
        message.channel.send("Error: date value out of range for " + userMonth)
        return;
    }

    message.channel.send("Success! " + userMonth + userDate)
    
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