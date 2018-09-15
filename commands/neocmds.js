exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    
    //External
	var msgFormat = require('../modules/funcStatusMsg.js');
    process.on('unhandledRejection', (e) => {
        message.channel.send("MAJOR ERROR! Contact @Neel#2970 \n ```\n" + `${e.stack})` + "\n```")})
    // if no arguments or length is less than 1 args
    if (!args || args.length < 1){
      return message.channel.send("Please use !neocmds help to know exactly how to use the subcommands.");
      // if no commands, show help
    }
    else
    {
        var cmdType = args[0];
        let response = null;
        switch (cmdType)
        {   
            //Load reload => BotSystem level... so maybe neobot?
            case "load":{
                response = await client.loadCommand(args[1]);
                if (response)  
                    return msgFormat.err(message,"Error!", `Error Loading: ${response}`);

                msgFormat.status(message,"Success!", `The command \`${args[1]}\` has been loaded`);
                break;
            }
            case "reload":{
                response = await client.unloadCommand(args[1]);
                if (response) 
                    return msgFormat.err(message,"Error!", `Error unloading: ${response}`);
            
                response = client.loadCommand(args[1]);
                if (response)  
                    return msgFormat.err(message,"Error!", `Error Loading: ${response}`);
            
                msgFormat.status(message,"Success!", `The command \`${args[1]}\` has been reloaded`);
                break;
            }


            //Enable/Disable commands for currentServer
            case "enable": {
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
                break;
            }
            case "disable": {
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
                        msgFormat.status (message, " :) ", "This command is already enabled for this server.")
                    }
                }
                break;
            }


            case "setupModuleDB":{
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
                break;
            }
            case "enabledModules":{
                //const Enmap = require("enmap"); //npm i enmap
                const EnmapLevel = require("enmap-level"); //npm i enmap-level
                const Provider = require("enmap-sqlite");
                const guildKey = `g-${message.guild.id}`;
                message.channel.send(`${client.cmdDB.has(guildKey)}`);

                if (client.cmdDB.has(guildKey)){
                    let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
                    message.channel.send(`This server ${guildKey} has the following module commands enabled:[ ${currArrCmds} ]`);
                }
                else
                {
                    message.channel.send("This server was not found in the database. Please consider running `!neocmds setupModuleDB`");
                }

                break;
            }
            case "listModules":{
                message.channel.send(`The following modules are available for use: ${client.moduleCmds.arrModuleCommands} `)
            }
            case "help":{
                //give detailed embeded help description
                showHelp(message);
            }
           
        }
    }
};


function showHelp(message){
    message.channel.send("!neocmds is built to control commands at the base level. If you don't know what you're doing, stop and contact the Bot Admin: `Neel#2970` \n__**The following sub commands are available for use:** __")
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
    aliases: ["cmds"],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "neocmds",
    category: "System",
    description: "Tools to adjust commands. Use !neocmds help to learn more.",
    usage: "!neocmds help"
};
  


/*

args:   0      1                2 
!cmds  
      load     <command name>
      reload   <command name>
      enable   <modulecommand>
               gasm            <name> 
      disable  <modulecommand>
               gasm            <name>
      startcollection 

*/


/* //Doesn't seem to do anything
case "unload": {
    let response = await client.unloadCommand(args[1]);
    if (response) 
        return message.reply(`Error Unloading: ${response}`);

    message.reply(`The command \`${args[1]}\` has been unloaded.`);
    break;
}
*/