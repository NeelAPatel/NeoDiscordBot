exports.run = async(client, message, args, level) => {
    //External
    var msgFormat = require('../modules/funcStatusMsg.js');
    const guildKey = `g-${message.guild.id}`;

    if (!(client.cmdDB.has(guildKey))){
        // if cmdDB does not have the key
        // this guild is not included in the module-command database
        // maybe leave a message? 
    }
    else
    {   
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes("myuserinfo")){
        
            //For Error messages
            process.on('unhandledRejection', (e) => {
                console.log(e.stack)
                var msgFormat = require('../modules/funcStatusMsg.js')
                msgFormat.err(message,"Error!", e.stack)});

             //Libraries
            const Discord = require("discord.js");
			const {promisify} = require("util");
			const fs = require("fs"),path = require("path");
            const readdir = promisify(require("fs").readdir);
            const SQLite = require("better-sqlite3");
            const sql = new SQLite('./userinfo.sqlite'); //setting the table
            
            checkTBLUInfoExists(message,sql)
            message.channel.send("tblUInfo Success");
            checkTBLUIntroExists()
            message.channel.send("tblUIntro Success");
            prepCommands(client, message, sql)  
            message.channel.send("PrepCommands Success");        
            
            let thisUserDetails = client.getUser.get(message.author.id);
            if (!thisUserDetails){
                thisUserDetails = {
                    id: `${message.guild.id}-${message.author.id}`,
                    userID: message.author.id,
                    userDisplay: message.member.displayName
                  }
                message.channel.send("thisUserGenerated success");
            }
            else {
                message.channel.send("thisUser Retrieved success")
            }



            if (!args[0]){
                //message.msgFormat.status(message, "UserInfo/Server Info", `${thisUserDetails.userID}`);
                //msgFormat.status(message, "UserInfo/Server Info", `${thisUserDetails.userDisplay}`);
                noargsCmd(client, message,thisUserDetails);
                message.channel.send("NoArgs Success")
            }
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
        sql.prepare("CREATE TABLE userInfo (id TEXT PRIMARY KEY, userID INTEGER, userDisplay TEXT);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_userInfo_id ON userInfo (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
        message.channel.send("Table Built");
    }
}

function checkTBLUIntroExists(){

}

function prepCommands(client, message, sql){
    // And then we have two prepared statements to get and set the score data.
    client.getUser = sql.prepare("SELECT * FROM userInfo WHERE userID = ?");
    client.addUser = sql.prepare("INSERT OR REPLACE INTO userInfo (id, userID, userDisplay) VALUES (@id, @userID, @userDisplay);");
    message.channel.send("Command ALL runned.");
}
async function noargsCmd(client, message, thisUserDetails){
    client.addUser.run(thisUserDetails);

    message.channel.send(thisUserDetails.userDisplay);
    client.addUser.run(thisUserDetails);
    message.channel.send("cmdComplete");
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "myuserinfo",
    category: "Module-based Commands | requires enabling for each server",
    description: "allows user info stuff",
    usage: "!info help"
};