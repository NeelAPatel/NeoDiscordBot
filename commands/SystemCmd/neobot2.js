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
            case "load":{
                loadCmd(args, client, message, msgFormat);
                break;
            }
            case "reload":{
                reloadCmd(args, client, message, msgFormat);
                break;
            }
            case "enable":{
                break;
            }
            case "disable":{
                break;
            }
            case "setupModuleDB":{
                break;
            }
            
            case "modules":{
                break;
            }
            case "stats":{ //Works
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

            
        }
    }
}

async function loadCmd(args, client, message){
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