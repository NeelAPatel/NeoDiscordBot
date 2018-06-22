module.exports = async client =>{
  client.logger.log ('Bot is online.', "ready");
  client.logger.log (`BOT[${client.user.tag}] is ready to serve ${client.users.size} Users across ${client.guilds.size} Servers with total ${client.channels.size} Channels.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help`, {type: "PLAYING"});
  }