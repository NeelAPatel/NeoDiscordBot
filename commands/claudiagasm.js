/*
TODO: <no-args, numpics> : everyone ;
TODO: <parameter stuff> : owner only;
TODO: ENABLE DISABLE COMMAND
*/

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildKey = `g-${message.guild.id}`;
	if (client.cmdDB.has(guildKey)){
		let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
		if (currArrCmds.includes("claudiagasm")){
			process.on('unhandledRejection', (e) => { console.log(e.stack)} );
			
			//let currArrCmds = client.cmdDB.getProp(guildKey,"commands");
			//if (currArrCmds.includes("claudiagasm")){}

			//libraries
			const Discord = require("discord.js");
			const {promisify} = require("util");
			const fs = require("fs"),path = require("path");
			const readdir = promisify(require("fs").readdir);
			const Enmap = require("enmap"); //npm i enmap
			const EnmapLevel = require("enmap-level"); //npm i enmap-level
			const Provider = require("enmap-sqlite");

			//if db doesn't exist, create and insert default values
			if (!client.cGasmDat){
				await createDB(client,Enmap,Provider);
				message.channel.send("Database created.");
			}
			if (!client.cGasmDat.has(guildKey)){
				addDefaultDB(client,guildKey);
				message.channel.send("Guild added to claudiagasmDB");
			}

			if (!args[0]){
				let folderPath = client.cGasmDat.getProp(guildKey, "folderPath");
				message.channel.send(`${folderPath}`);
				let arrPaths = client.cGasmDat.getProp(guildKey, "arrPaths");
				if (!(folderPath === "fp-") && (arrPaths.length > 0)){
					var file = new Discord.Attachment();
					
					var randomNum = Math.floor(Math.random()*arrPaths.length);
					var picturePath = arrPaths[Math.floor(Math.random()*arrPaths.length)];
					try {
					fs.accessSync(picturePath);
					} catch (e) {
					fs.mkdirSync(picturePath);
					console.log("The path you entered does not exist. Please try again.")
					//sendMessage(message, 'ERROR', 'ERROR', `The path you entered does not exist. Please try again.`);
					}
			
					file.setAttachment(picturePath);
					message.channel.send(file);
					console.log("ClaudiaGasm: [%d][%s]\n", randomNum,  picturePath);
				}
				else {
					message.channel.send("ERROR: Please run `!claudiaGasm setpath <path>`");	
				}
				
			}   
			else if (args[0] === "setpath" || args[0] === "trace" && args[1]){
				userPath = args[1];
				if (userPath === undefined)
					message.channel.send("ERROR: Missing path argument");
				else if (!fs.existsSync(userPath)) 
					message.channel.send("ERROR: Path does not exist.");
				else{
					
					client.cGasmDat.setProp(guildKey, "folderPath", args[1]);
					
					let arrPaths = client.cGasmDat.getProp(guildKey, "arrPaths");
					arrPaths = [];
					fs.readdir(userPath, function(err,files) //readdir is asynchronous
					{
						if (err) {
							throw err;
						}
					
						files.map(function(file){
							return path.join(userPath, file);
						}).filter(function (file){
							return fs.statSync(file).isFile();
						}).forEach(function(file){
							arrPaths.push(file);
							console.log("%s (%s)", file, path.extname(file));
						})    
						
						client.cGasmDat.setProp(guildKey,"arrPaths", arrPaths);
					});
					message.channel.send("Folder trace complete!");
					let folderPath = client.cGasmDat.getProp(guildKey, "folderPath");
					message.channel.send(`${folderPath}`);
				}
			}
			else if (args[0] === "getpath"){
				let folderPath = client.cGasmDat.getProp(guildKey, "folderPath");
					message.channel.send(`${folderPath}`);
			}
			else if (args[0] === "delFromDB"){
				if (client.cGasmDat.has(guildKey)){
					client.cGasmDat.delete(guildKey);
				}
			}
		}
	}
	else{
		message.channel.send("Sorry, this module is not enabled here.");
	}
	

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
name: "claudiagasm",
category: "Miscelaneous",
description: "posts a random picture of claudia",
usage: "claudiagasm OR\n claudiagasm setpath <path> \n claudiagasm [tracepath|getpath]"
};


async function createDB (client, Enmap, Provider){
	client.cGasmDat = new Enmap({
		provider: new Provider({
			name: "cGasmDat"
		})
	});
}

function addDefaultDB(client,guildKey){
	client.cGasmDat.set(guildKey, {
		folderPath : "fp-",
		//currNumPics : "cnp-",
		arrPaths : []
	});
}
