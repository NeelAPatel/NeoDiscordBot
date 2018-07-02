exports.run = async (client, message, args, level) => { 
const guildKey = `g-${message.guild.id}`;
		let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
		if (currArrCmds.includes("cmdping")) {
			message.channel.send("cmdPONG");
		} else {
			message.channel.send("COMMAND IS DISABLED");
		}
	};