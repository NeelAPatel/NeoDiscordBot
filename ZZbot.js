//Prelim Setup - Initialize Bot
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client(); //client = the bot
const config = require("./botConfig.json");


//Prelim Setup - When Bot is live... (ready)
client.on("ready", () => {
	console.log("I am ready!");
});


// Event - Message
client.on("message", (message) => {
  // IF (message does not start with prefix, or if the message's author is a bot) => do nothing
	if (!message.content.startsWith(config.prefix) || message.author.bot)
		return;

	if (message.content.startsWith(config.prefix + "ping")) {
		message.channel.send("pong!");
	} 

	if (message.content.startsWith(config.prefix + "foo")) {
		message.channel.send("bar!");
	}


	//Get author id
	if (message.content.startsWith(config.prefix + "authorID")){
		message.channel.send(message.author.id);
	}
	//IF (author != Neel's id), do nothing. else... 
	if(message.author.id !== config.ownerID) 
		return;

	// change prefix
	if(message.content.startsWith(config.prefix + "prefix")) {
		// Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
		let newPrefix = message.content.split(" ").slice(1, 2)[0];
		// change the configuration in memory
		config.prefix = newPrefix;
	  
		// Now we have to save the file.
		fs.writeFile("./botConfig.json", JSON.stringify(config), (err) => console.error);
	  }
});


//Login token
client.login(config.token);



// old stuff
// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		// super-secret recipe to call events with all their proper arguments *after* the `client` var.
		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

client.on("message", message => {
	if (message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;

	// This is the best way to define args. Trust me.
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// The list of if/else is replaced with those simple 2 lines:
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
});