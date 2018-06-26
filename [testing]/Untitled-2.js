// commands enabled/disabled
/* goal: 
    cmdName = message;?     
    thisGuild = guild.id;    
    array thisCmdList[] = cmdDB.getCommands(thisGuild)
    if (thisCmdList.contains(cmdName)){
        thisCmdEnabled = thisCmdList.get(cmdName).isEnabled
        if (thisCmdEnabled){
            run it
        }
        else {
            messaage.channel.send("Command not enabled");
        }
    }
    */


//LIBRARIES being used
const Discord = require("discord.js"); 
const fs = require("fs"); //file reading
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

//ENMAP libraries
const Enmap = require("enmap"); //npm i enmap
const EnmapLevel = require("enmap-level"); //npm i enmap-level
const Provider = require("enmap-sqlite");

//bot and config
const client = new Discord.Client();
client.config = require("./botConfig.js");

client.cmdDB = new Enmap ({provider: new Provider({name: "cmdDB"})}); // persists data through reboots

client.on("guildCreate", guild => {  
    /*Key format: g-##### */
    const guildKey = `g-${message.guild.id}`;
    //if cmdDB does not have guildKey...
    if (!client.cmdDB.has(guildKey)){
        
       //Add Guild
       client.cmdDB.set(guildKey,
       {
           guildName: message.guild.id,
           commands: {
               name: customName
           }
       });
       /* This means that for every guild the bot joins,
           A guildKey will be added to the database. 
           Every name listed under commands = enabled. 
           Each GuildKey
           - guildName
           - Commands
              - name: foo,
              - name: bar
              ...
       */
   }
});


client.on("message", message => {
    /*
    - if command exists
      - if command is enabled in guild
        - runCommand()
      - else
        - Error: Command does not exist
    
    */



});

