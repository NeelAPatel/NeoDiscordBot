exports.run = async (client, message, args, level) =>{
	// external libraries
	var msgFormat = require('../modules/funcStatusMsg.js')

	// GUILD KEY
	const guildKey = `g-${message.guild.id}`
	
	message.channel.send(`Your level is: ${level}`)

	if (!client.cmdDB.has(guildKey)){
		//Guild is not set up for ModuleCommand manipulation
	}
	else
	{
		//Get array of enabled commands of this server from cmdDB
		let enabledModulesDB = client.cmdDB.getProp(guildKey,"commands");
		if (enabledModulesDB.includes("tag")){

			//Libraries
            const Discord = require("discord.js");
			const {promisify} = require("util");
			const fs = require("fs"),path = require("path");
			const readdir = promisify(require("fs").readdir);
			const Enmap = require("enmap"); //npm i enmap
			const EnmapLevel = require("enmap-level"); //npm i enmap-level
			const Provider = require("enmap-sqlite");

			//if db doesn't exist, create and insert default values
			if (!client.tagDB){
				await createDB(client,Enmap,Provider);
				//msgFormat.status(message,"Success!","Database created.");
			}
			if (!client.tagDB.has(guildKey)){
				addDefaultDB(client,guildKey);
				//msgFormat.status(message,"Success!","Guild added to gasmDB");
            }

			//=== Command Properties
			if (!args[0]){
				//list all the tags
			}
			else{
				switch(args[0]){
					case "help": {break;}
					case "add": {break;}
					case "edit": {break;}
					case "delete": {break;}
					default: 
					{
						//test if its in the thingy
						break;
					}
				}
			}

		}
		else{
			msgFormat.err(message, "ERROR!","Sorry, this module is not enabled here.");
		}
	}


}


async function createDB (client, Enmap, Provider){
	client.tagDB = new Enmap({
		provider: new Provider({
			name: "tagDB"
		})
	});
}

function addDefaultDB(client,guildKey){
	client.tagDB.set(guildKey, {
		arrTags: "",
		tagContent: ""
	});
}



exports.conf ={
	enabled: true, 
	guildOnly: false,
	aliases: ["t"],
	permLevel: "User"
};

exports.help = {
	name: "tag", 
	category: "Module-based Commands | requires enabling for each server",
	description: "allows direct posting of custom text and links",
	usage: "!tag <item> || !tag list"
}