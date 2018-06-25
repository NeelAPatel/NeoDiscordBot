exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args || args.length < 1) 
        return message.reply("Must provide a command to reload. Derp.");
    else
    {
       if (args[1]){

       }
       else {
            // Show individual command's help.
            let command = args[0];


            if (client.commands.has(command)) {
                command = client.commands.get(command);
                if (level < client.levelCache[command.conf.permLevel]) 
                    return;
                message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
            }
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "view",
    category: "Miscelaneous",
    description: "LE VIEW",
    usage: "view"
};
