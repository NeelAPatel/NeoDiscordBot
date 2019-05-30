// NODE.JS VERSION CONFIRMATION
if (process.version.slice(1).split(".")[0] < 8)
	throw new Error("Node 8.0.0 or higher is required to run this application. Update Node on your system.");

//LIBRARIES
const Discord = require("discord.js"); 
const fs = require("fs"); //file reading
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap"); //npm i enmap
const EnmapLevel = require("enmap-level"); //npm i enmap-level
const Provider = require ("enmap-sqlite");
var path = require('path');
//CLIENT - The bot. 
const client = new Discord.Client();

//EXTRANEOUS FILES
client.config = require("./AA_PRIV_CONFIG.js");

//client.config.token = token
//client.config.prefix = prefix

// Require our logger
client.logger = require("./util/Logger.js");
require("./modules/functions.js")(client);

//COLLECTIONS - allows read write cataloged listed
client.commands = new Enmap();
client.aliases = new Enmap();

//SETTINGS - allows us to store per server config? 
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

//CMDDB
client.cmdDB = new Enmap({ provider: new Provider({	name: "cmdDB"	})}); // persists data through reboots
client.moduleCmds = require("./modules/customCmds.json");

// directory walk function





const init = async () => {
	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	// const cmdFiles = await readdir("./commands/"); //collection of command Files
	// client.logger.log(`Loading a total of ${cmdFiles.length} commands.`); 
	// cmdFiles.forEach(f => {
	// 	if (!f.endsWith(".js")) 
	// 		return;
	// 	console.log('>>>' + f);
	// 	const response = client.loadCommand(f); //loads the command and if a response is produced, print it out
	// 	if (response) 
	// 		console.log(response);
	// });



	var walk = function(dir, done) {
		var results = [];
		fs.readdir(dir, function(err, list) {
			if (err) 
				return done(err);
			var pending = list.length;
			if (!pending) 
				return done(null, results);
			list.forEach(function(file) {
				
				file = path.resolve(dir, file);
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
					} else {
						results.push(file);
						if (!--pending) 
							done(null, results);
					}
				});
			});
		});
	};

	// const cmdFiles = await readdir("./commands/"); //collection of command Files
	// client.logger.log(`Loading a total of ${cmdFiles.length} commands.`); 
	// cmdFiles.forEach(f => {
	// 	if (!f.endsWith(".js")) 
	// 		return;
	// 	const response = client.loadCommand(f); //loads the command and if a response is produced, print it out
	// 	if (response) 
	// 		console.log(response);
	// });

	walk("./commands/", function(err, results) {
		if (err) throw err;
		//console.log(results);
		//console.log(require('path').dirname(require.main.filename))
		results.forEach(f => {
			//console.log(f);
			currDir = require('path').dirname(require.main.filename);
			f = f.replace(currDir  + '/commands/', '');
			//console.log('[NEW] ' +  f);
			if (!f.endsWith(".js")) 
				return;

			//console.log(f);
			const response = client.loadCommand(f); //loads the command and if a response is produced, print it out
			if (response) 
				console.log(response);
		});
	  });
	  

	




	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir("./events/"); //collection of event files
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

	// Generate a cache of client permissions for pretty perms
	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
	  const thisLevel = client.config.permLevels[i];
	  client.levelCache[thisLevel.name] = thisLevel.level;
	}
	process.on('unhandledRejection', (e) => { console.log(e.stack)} );
	
	client.login(client.config.token);
};


init();