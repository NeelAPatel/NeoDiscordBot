exports.run = async(client, message, args, level) => {
    //External
    var msgFormat = require('../modules/funcStatusMsg.js');
    const guildKey = `g-${message.guild.id}`;

    if (!(client.cmdDB.has(guildKey))) // if cmdDB does not have the key
    {
        // this guild is not included in the module-command database
        // maybe leave a message? 
    }
    else
    {
        //bday is enabled
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes("bday")){
             //For Error messages
             process.on('unhandledRejection', (e) => { console.log(e.stack)} );
             //Libraries
            const Discord = require("discord.js");
			const {promisify} = require("util");
			const fs = require("fs"),path = require("path");
			const readdir = promisify(require("fs").readdir);
			const Enmap = require("enmap"); //npm i enmap
			const EnmapLevel = require("enmap-level"); //npm i enmap-level
            const Provider = require("enmap-sqlite");
            
            //if db doesn't exist, create and insert default values
			if (!client.bdayDB){
				await createDB(client,Enmap,Provider);
				msgFormat.status(message,"Success!","Database created.");
			}
			if (!client.bdayDB.has(guildKey)){
				addDefaultDB(client,guildKey);
				msgFormat.status(message,"Success!","Guild added to bdayDB");
            }
            

        }

    }

    
}

function addDefaultDB(client,guildKey){
	client.gasmDB.set(guildKey, {
		folderPath : "[Blank]",
		arrPaths : []
	});
}



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "bday",
    category: "Module-based Commands | requires enabling for each server",
    description: "allows bday management for the server",
    usage: "!bday help"
};