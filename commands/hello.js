
/*
  Enabled = Is command allowed to be used? T/F
  guildOnly = 
  aliases = different names? 
  permLevel: "User" = any user 
  
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("uwu!");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "hello",
    category: "Miscelaneous",
    description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
    usage: "hello"
  };
  