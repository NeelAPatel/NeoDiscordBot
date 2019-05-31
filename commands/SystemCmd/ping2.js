
/*
  Enabled = Is command allowed to be used? T/F
  guildOnly = 
  aliases = different names? 
  permLevel: "User" = any user 
  
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  //client.moduleCmds = require("../modules/customCmds.json");
  //message.channel.send(`${client.moduleCmds.arrModuleCommands}`);
  //message.channel.send("WEEWOO")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping2",
  category: "Miscelaneous",
  description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
  usage: "ping"
};
