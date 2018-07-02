// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  //NOTIFIES US THAT A GUILD HAS BEEN JOINED
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  //ADDS GUILD TO DB UPON JOINING. 
  const guildKey = `g-${guild.id}`;
	//if cmdDB does not have guildKey...
	if (!client.cmdDB.has(guildKey)) {

		//Add Guild
		client.cmdDB.set(guildKey, {
			guildName: guild.id,
			commands: ["cmdping", "customcmd"] //array of commands
		});
  }
};
