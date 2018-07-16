// commands enabled/disabled
/* goal: 
	cmdName = message;?     
	thisGuild = guild.id;    
	array thisCmdList[] = cmdDB.getCommands(thisGuild)
	if (thisCmdList.contains(cmdName)){
		thisCmdEnabled = taaaahisCmdList.get(cmdName).isEnabled
		if (thisCmdEnabled){
			run it
		}
		else {
			messaage.channel.send("Command not enabled");
		}
	}
*/


//LIBRARIES being used
const Discord = require("discord.js");
const fs = require("fs"); //file reading
const {
	promisify
} = require("util");
const readdir = promisify(require("fs").readdir);

//ENMAP libraries
const Enmap = require("enmap"); //npm i enmap
const EnmapLevel = require("enmap-level"); //npm i enmap-level
const Provider = require("enmap-sqlite");

//bot and config
const client = new Discord.Client();
const config = require("./config.json");

client.cmdDB = new Enmap({
	provider: new Provider({
		name: "cmdDB"
	})
}); // persists data through reboots

client.on("ready", () => {
	console.log("I am ready!");
});


client.on("guildCreate", guild => {
	/*Key format: g-##### */
	const guildKey = `g-${guild.id}`;
	//if cmdDB does not have guildKey...
	if (!client.cmdDB.has(guildKey)) {

		//Add Guild
		client.cmdDB.set(guildKey, {
			guildName: guild.id,
			commands: ["cmdping", "customcmd"] //array of commands
		});
		/* This means that for every guild the bot joins,
		   A guildKey will be added to the database. 
		   Every name listed under commands = enabled. 
		   Each GuildKey
		   - guildName
		   - Commands
			  - name: foo,
			  - name: bar
			  ...
	   	*/
	}
});


client.on("message", message => {
	if (message.author.bot) return;
	if (message.guild) { /* Points Code Here */ }
	if (!message.content.startsWith(config.prefix) || message.author.bot)
		return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		message.channel.send("Pong!");
	}

	if (command === "cmdping") {
		const guildKey = `g-${message.guild.id}`;
		let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
		if (currArrCmds.includes("cmdping")) {
			message.channel.send("cmdPONG");
		} else {
			message.channel.send("COMMAND IS DISABLED");
		}
	}

	if (command === "startcollection") {
		message.channel.send("starting process");
		const guildKey = `g-${message.guild.id}`;
		//if cmdDB does not have guildKey...
		if (!client.cmdDB.has(guildKey)) {

			//Add Guild
			client.cmdDB.set(guildKey, {
				guildName: message.guild.id,
				commands: ["cmdping"] //array of commands
			});
		}
		message.channel.send("process complete");
	}

	if (command === "disable") {
		let cmdToDisable = args[0];
		const guildKey = `g-${message.guild.id}`;

		let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
		if (currArrCmds.includes(cmdToDisable)) {
			// remove 
			//message.channel.send(`${cmdToDisable} will be removed.`);
			var index = currArrCmds.indexOf(cmdToDisable);
			if (index > -1) {
				currArrCmds.splice(index, 1);
			}
			//message.channel.send(`${cmdToDisable} has been removed from the array.`);

			client.cmdDB.setProp(guildKey, "commands", currArrCmds);
			//message.channel.send(`${cmdToDisable} has been disabled`);

		} else {
			//message.channel.send("Command does not exist in cmdDB");
		}
	}



	if (command === "enable") {
		let cmdToEnable = args[0];
		const guildKey = `g-${message.guild.id}`;

		let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
		if (currArrCmds.includes(cmdToEnable)) {
			// we good. 
			message.channel.send(`${cmdToEnable} is already included.`);
		} else {
			message.channel.send(`${cmdToEnable} will be pushed.`);
			currArrCmds.push(cmdToEnable);
			message.channel.send(`${cmdToEnable} has been pushed.`);
		}
	}




});

client.login(config.token);