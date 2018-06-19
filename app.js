// NODE.JS VERSION CONFIRMATION
if (process.version.slice(1).split(".")[0] < 8)
	throw new Error("Node 8.0.0 or higher is required to run this application. Update Node on your system.");

//LIBRARIES
const Discord = require("discord.js");
const fs = require("fs");
const { promisify } = require("util");
//const readdir = promisify(require("fs").readdir);
//const Enmap = require("enmap");
//const EnmapLevel = require("enmap-level");

//CLIENT - The bot. 
const client = new Discord.Client();

//EXTRANEOUS FILES
client.config = require("./botConfig.js");

//client.config.token = token
//client.config.prefix = prefix

// Require our logger
require("./functions.js")(client);
client.logger = require("./util/Logger");


const init = async () => {
	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const cmdFiles = await readdir("./commands/");
	client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach(f => {
		if (!f.endsWith(".js")) return;
		const response = client.loadCommand(f);
		if (response) console.log(response);
	});

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
	  const eventName = file.split(".")[0];
	  const event = require(`./events/${file}`);
	  // This line is awesome by the way. Just sayin'.
	  client.on(eventName, event.bind(null, client));
	  const mod = require.cache[require.resolve(`./events/${file}`)];
	  delete require.cache[require.resolve(`./events/${file}`)];
	  for (let i = 0; i < mod.parent.children.length; i++) {
		if (mod.parent.children[i] === mod) {
		  mod.parent.children.splice(i, 1);
		  break;
		}
	  }
	});
	
	
	client.login(config.token);
};







init();