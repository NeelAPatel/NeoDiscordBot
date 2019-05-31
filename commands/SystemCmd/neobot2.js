exports.run = async (client, message, args, level) => {
    //External
    const fs = require("fs"); 
    var path = require('path');
    var msgFormat = require('../../modules/funcStatusMsg.js');
    
    //For Error messages
    process.on('unhandledRejection', (e) => {
        console.log(e.stack)
        var msgFormat = require('../../modules/funcStatusMsg.js')
        msgFormat.err(message,"Error!", e.stack)
    });


    if (!args[0]){
        //no args
        // show possible sub commands
    }
    else{
        switch(args[0]){
            case "load":{ // Works
                loadCmd(args, client, message, msgFormat);
                break;
            }
            case "reload":{ // Works
                reloadCmd(args, client, message, msgFormat);
                break;
            }
            case "setupModuleDB":{
                setupModuleDB(client, message);
                break;
            }
            
            case "modules":{ // works
                modulesSummary(client, message);
                break;
            }
            case "enable":{
                enableModule(client, message, msgFormat);
                break;
            }
            case "disable":{
                disableModule(client, message, msgFormat);
                break;
            }
            
            case "stats":{ // Works
                dispStats(client,message);
                break;
            }
            case "killbot":
            case "selfdestruct":{
                await message.reply("Bot is shutting down.");
                client.commands.forEach( async cmd => {
                    await client.unloadCommand(cmd);
                });
                process.exit(1);
                break;
            }
            case "help":{
                showHelp(message);
                break;
            }

            
        }
    }
}

function setupModuleDB(client, message){
    //message.channel.send("starting process");
    const guildKey = `g-${message.guild.id}`;
    //if cmdDB does not have guildKey...
    if (!client.cmdDB.has(guildKey)) {
        //Add Guild
        client.cmdDB.set(guildKey, {
            guildName: message.guild.id,
            commands: [] //array of commands
        });
        message.channel.send(`Added ${message.guild.name} to ModulesManagement Database. You can now start enabling modules!`);
        message.channel.send(`The following modules are available for use: ${client.moduleCmds.arrModuleCommands} `)
    }
    else
    {
        //guild key is already in the database
        message.channel.send("Server `"+ message.guild.name +"` already exists in the ModulesManagement Database.\nPlease run `!neocmds listmodules` to view available modules.");
    }
}
function modulesSummary(client, message){
    //const Enmap = require("enmap"); //npm i enmap
    const EnmapLevel = require("enmap-level"); //npm i enmap-level
    const Provider = require("enmap-sqlite");
    const guildKey = `g-${message.guild.id}`;
    //message.channel.send(`${client.cmdDB.has(guildKey)}`);


    message.channel.send(`The following modules are available for use: ${client.moduleCmds.arrModuleCommands} `)

    if (client.cmdDB.has(guildKey)){
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        message.channel.send(`This server ${message.guild.name} has the following module commands enabled:[ ${currArrCmds} ]`);
    }
    else
    {
        message.channel.send(`This server ${message.guild.name} was not found in the database. Please consider running ``!neocmds setupModuleDB```);
    }


    
}

function enableModule(client, message, msgFormat){
    let cmdToEnable = args[1];
    const guildKey = `g-${message.guild.id}`;

    // check ListOf client.moduleCmds = modules available for the bot
    if (!client.cmdDB.has(guildKey)){
        //if guild is not in cmdDB   
        msgFormat.err(message, "Error", `${message.guild.name}` + " is not in the ModuleManagement Database.\n Please run `!neocmds setupModuleDB`")
    }
    else{
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes(cmdToEnable)) {
            // we good. 
            msgFormat.status (message, " :) ", "This command is already enabled for this server.")
        } else {
            currArrCmds.push(cmdToEnable);
            client.cmdDB.setProp(guildKey,"commands", currArrCmds);
            msgFormat.status(message, "Success!", `${cmdToEnable} module has been enabled for this server.`)
        }
    }
}
function disableModule(client, message, msgFormat){
    let cmdToDisable = args[1];
    const guildKey = `g-${message.guild.id}`;        

    if (!client.cmdDB.has(guildKey)){
        //if guild is not in cmdDB   
        msgFormat.err(message, "Error", `${message.guild.name}` + " is not in the ModuleManagement Database.\n Please run `!neocmds setupModuleDB`")
    }
    else{
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes(cmdToDisable)) {
            // remove 
            var index = currArrCmds.indexOf(cmdToDisable);
            if (index > -1) {
                currArrCmds.splice(index, 1);
            }
            client.cmdDB.setProp(guildKey, "commands", currArrCmds);
            
            msgFormat.status(message, "Success!", `${cmdToDisable} module has been removed for this server.`)
        // message.channel.send(`${cmdToDisable} has been disabled`);

        } else {
            msgFormat.status (message, " :) ", "This command is already disabled for this server.")
        }
    }
}
async function loadCmd(args, client, message, msgFormat){
    if (!args[1].endsWith(".js")) 
		args[1] = args[1] + ".js";
    
    let response = null;
    response = await client.loadCommand(args[1]);
    if (response)  
        return msgFormat.err(message,"Error!", `Error Loading: ${response}`);

    msgFormat.status(message,"Load Success!", `The command \`${args[1]}\` has been loaded into memory`);
}

async function reloadCmd(args, client, message, msgFormat){
    //var msgFormat = require('../../modules/funcStatusMsg.js');
    let response = null;
    
    if (!args[1].endsWith(".js")) 
		args[1] = args[1] + ".js";

    response = await client.unloadCommand(args[1]);
    if (response) 
        return msgFormat.err(message,"Error!", `Error unloading: ${response}`);

    response = client.loadCommand(args[1]);
    if (response)  
        return msgFormat.err(message,"Error!", `Error Loading: ${response}`);

    msgFormat.status(message,"Reload Success!", `The command \`${args[1]}\` has been reloaded into memory`);
}

function dispStats(client, message){
    const { version } = require("discord.js");
    const moment = require("moment");
    require("moment-duration-format");
    
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send(`= STATISTICS =
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    • Uptime     :: ${duration}
    • Users      :: ${client.users.size.toLocaleString()}
    • Servers    :: ${client.guilds.size.toLocaleString()}
    • Channels   :: ${client.channels.size.toLocaleString()}
    • Discord.js :: v${version}
    • Node       :: ${process.version}`, {code: "asciidoc"});
}

function showHelp(message){
    message.channel.send("!neocmds is built to control commands at the base level. If you don't know what you're doing," + 
    " stop and contact the Bot Admin: `Neel#2970` \n__**The following sub commands are available for use:** __")
    const embed = {
        "title": "!neocmds help",
        "color": 16098851,
        "fields": [
          {
            "name": "load <cmd>",
            "value": "Loads a command from the server, mainly used when a new command is added while the bot is running. "
          },
          {
            "name": "reload <cmd>",
            "value": "Removes the command from memory and reloads. Used when a command is edited and changes need to be deployed."
          },
          {
            "name": "enable <cmd>",
            "value": "Enables a command for this specific server. "
          },
          {
            "name": "disable <cmd>",
            "value": "Disables a command for this specific server. "
          },
          {
            "name": "setupModuleDB",
            "value": "Adds the server to the Database so that Module-Commands can be enabled for use."
          },
          {
            "name": "listEnabledModules",
            "value": "Returns a list of modules that are enabled in the server"
          },
          {
            "name": "availableModules",
            "value": "Lists all available modules"
          },
          {
            "name": "help",
            "value": "Shows this message again"
          }
        ]
      };

    message.channel.send({embed});
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "neobot2",
    category: "System",
    description: "Tools for controlling the bot itself.",
    usage: "!neobot2 <args>"
};