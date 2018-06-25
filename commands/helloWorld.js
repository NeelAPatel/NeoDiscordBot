
/*
  Enabled = Is command allowed to be used? T/F
  guildOnly = 
  aliases = different names? 
  permLevel: "User" = any user 
  
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("world says hello");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "helloWorld",
    category: "Miscelaneous",
    description: "Hello test",
    usage: "helloWorld"
  };
  