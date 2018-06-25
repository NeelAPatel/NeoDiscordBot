
/*
  Enabled = Is command allowed to be used? T/F
  guildOnly = 
  aliases = different names? 
  permLevel: "User" = any user 
  
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("hellow 1");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "hello1",
    category: "Miscelaneous",
    description: "hello1 test",
    usage: "hello1"
  };
  