exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  if (!args || args.length < 1) 
    return message.reply("Must provide a command to load.");

  //let response = await client.unloadCommand(args[0]);
  let response = await client.loadCommand(args[0]);
  //let response = client.loadCommand(args[0]);
  
  if (response)  
    return message.reply(`Error Loading: ${response}`);

  message.reply(`The command \`${args[0]}\` has been loaded`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
  };
  
  exports.help = {
    name: "cmdload",
    category: "System",
    description: "Loads a command",
    usage: "cmdload [command]"
  };
  