exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    
    // if no arguments or length is less than 1 args
    if (!args || args.length < 1) 
      return message.reply("Must provide a command to reload. Derp.");
    else
    {
        var cmdType = args[0];
        let response = null;
        switch (cmdType)
        {
            case "load":
                response = await client.loadCommand(args[1]);
                //loadCMD(client,args[1], message);
                if (response)  
                    return message.reply(`Error Loading: ${response}`);

                message.reply(`The command \`${args[1]}\` has been loaded`);
                break;
            case "reload":
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
            case "unload":
                //unloadCMD(client,args[1], message);
                //message.reply(`The command \`${args[1]}\` has been UNLOADED`);
                response = await client.unloadCommand(args[0]);
                if (response) 
                    return message.reply(`Error Unloading: ${response}`);

                message.reply(`The command \`${args[0]}\` has been unloaded.`);
                break;
            case "view":
                


                break;

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
    usage: "cmds [load|reload|unload] [command]"
};
  