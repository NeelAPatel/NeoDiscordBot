exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    
    // if no arguments or length is less than 1 args
    if (!args || args.length < 1){
      return message.reply("Must provide a command to reload. Derp.");
      // if no commands, show help
    }
    else
    {
        var cmdType = args[0];
        let response = null;
        switch (cmdType)
        {   
            case "startcollection":{
                //message.channel.send("starting process");
                const guildKey = `g-${message.guild.id}`;
                //if cmdDB does not have guildKey...
                if (!client.cmdDB.has(guildKey)) {
                    //Add Guild
                    client.cmdDB.set(guildKey, {
                        guildName: message.guild.id,
                        commands: [] //array of commands
                    });
                }
                //message.channel.send("process complete");
                break;
            }
            case "enable": {
                let cmdToEnable = args[1];
                /*
                if (cmdToEnable === "gasm"){
                    //duplicate file
                }*/
                
                const guildKey = `g-${message.guild.id}`;        
                let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
                // check ListOfModuleCMDS

                if (currArrCmds.includes(cmdToEnable)) {
                    // we good. 
                   // message.channel.send(`${cmdToEnable} is already included.`);
                } else {
                    //message.channel.send(`${cmdToEnable} will be pushed.`);
                    currArrCmds.push(cmdToEnable);
                    message.channel.send(`${cmdToEnable} module has been enabled.`);
                    client.cmdDB.setProp(guildKey,"commands", currArrCmds);
                }
                break;
            }
            case "disable": {
                let cmdToDisable = args[1];
                if (cmdToDisable === "gasm"){
                    //duplicate file
                }
                
                const guildKey = `g-${message.guild.id}`;        
                let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
                // check ListOfModuleCMDS
                
                if (currArrCmds.includes(cmdToDisable)) {
                    // remove 
                    //message.channel.send(`${cmdToDisable} will be removed.`);
                    var index = currArrCmds.indexOf(cmdToDisable);
                    if (index > -1) {
                        currArrCmds.splice(index, 1);
                    }
                    //message.channel.send(`${cmdToDisable} has been removed from the array.`);
                    client.cmdDB.setProp(guildKey, "commands", currArrCmds);
                   // message.channel.send(`${cmdToDisable} has been disabled`);

                } else {
                    //message.channel.send("Command does not exist in cmdDB");
                }
                break;
            }
            case "load":{
                response = await client.loadCommand(args[1]);
                //loadCMD(client,args[1], message);
                if (response)  
                    return message.reply(`Error Loading: ${response}`);

                message.reply(`The command \`${args[1]}\` has been loaded`);
                break;
            }
            case "reload":{
                
                //unloadCMD(client,args[1], message);
                //loadCMD(client,args[1], message);
                //message.reply(`The command \`${args[1]}\` has been RELOADED`);
                response = await client.unloadCommand(args[1]);
                if (response) 
                return message.reply(`Error Unloading: ${response}`);
            
                response = client.loadCommand(args[1]);
                if (response)  
                return message.reply(`Error Loading: ${response}`);
            
                message.reply(`The command \`${args[1]}\` has been reloaded`);
                break;
            }
            case "viewDB":{
                //const Enmap = require("enmap"); //npm i enmap
                const EnmapLevel = require("enmap-level"); //npm i enmap-level
                const Provider = require("enmap-sqlite");
                const guildKey = `g-${message.guild.id}`;
                message.channel.send(`${client.cmdDB.has(guildKey)}`);

                if (client.cmdDB.has(guildKey)){
                    let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
                    message.channel.send(`This server ${guildKey} has these module commands enabled:[ ${currArrCmds} ]`);
                }

                break;
            }
           
        }
    }
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["command", "cmdtools"],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "cmds",
    category: "System",
    description: "Tools to adjust commands. Use !help cmds to learn more.",
    usage: "cmds [load|reload|enable|disable|startcollection] [command]"
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