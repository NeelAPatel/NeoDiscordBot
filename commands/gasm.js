exports.run = async(client, message, args, level) => {

	//External
	var msgFormat = require('../modules/funcStatusMsg.js');

    // Key = numeric identifier of the current guild
    const guildKey = `g-${message.guild.id}`;

    if (!(client.cmdDB.has(guildKey))) // if cmdDB does not have the key
    {
        // this.guild is not included in the module-command database
        // maybe leave a message? 
    }
    else
    {
        //gasm is enabled
        let currArrCmds = client.cmdDB.getProp(guildKey, "commands");
        if (currArrCmds.includes("gasm")){
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
			if (!client.gasmDB){
				await createDB(client,Enmap,Provider);
				msgFormat.status(message,"Success!","Database created.");
			}
			if (!client.gasmDB.has(guildKey)){
				addDefaultDB(client,guildKey);
				msgFormat.status(message,"Success!","Guild added to gasmDB");
            }
            

            //=== COMMAND PROPERTIES 
            if (!args[0]) // No args = Regular !gasm
            {
				let folderPath = client.gasmDB.getProp(guildKey, "folderPath");
				//`${folderPath}`);
				let arrPaths = client.gasmDB.getProp(guildKey, "arrPaths");
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
					console.log("                       GasmUpload -  [%s]", picturePath);
				}
				else {
					msgFormat.err(message, "ERROR!","Please run `!Gasm setpath <path>`");	
				}
				
			}   
			else{
				switch (args[0]){
					case "setpath":
					case "tracefolder":	{
						//Gets the Path argument
						userPath = args[1];

						//Checks if the path is valid
						if (userPath === undefined)
							msgFormat.err(message, "ERROR!","Missing path argument");
						else if (!fs.existsSync(userPath)) 
							msgFormat.err(message, "ERROR!","Path does not exist.");
						else{
							//Path is valid!
							
							//Stores the path in gasmDB
							client.gasmDB.setProp(guildKey, "folderPath", args[1]);
							
							//Gets the array of paths from gasmDB
							let arrPaths = client.gasmDB.getProp(guildKey, "arrPaths");
							arrPaths = []; // resets the array to empty
							fs.readdir(userPath, function(err,files) { //readdir is asynchronous
								if (err) { throw err; }
								/* Fetches each from the given userPath 
								and adds its path to the array */
								files.map(function(file){
									return path.join(userPath, file);
								}).filter(function (file){
									return fs.statSync(file).isFile();
								}).forEach(function(file){
									arrPaths.push(file);
									console.log("%s (%s)", file, path.extname(file));
								})    
								
								// adds new array to gasmDB
								client.gasmDB.setProp(guildKey,"arrPaths", arrPaths);
							});

							//Wrapping up: Let user know the operation is complete + the path that was traced
							
							let folderPath = client.gasmDB.getProp(guildKey, "folderPath");
							msgFormat.status(message,"Success!","Folder trace complete!\n Traced Path: " + `${folderPath}`);
						}
						
						break;
					}
					case "getpath":{
						// return the currently traced path
						let folderPath = client.gasmDB.getProp(guildKey, "folderPath");
						msgFormat.status(message,"Current Path:",`${folderPath}`);
					
						break;
					}
					case "delFromDB":{
						// removes date from gasmDB
						if (client.gasmDB.has(guildKey)){
							client.gasmDB.delete(guildKey);
							msgFormat.status(message,"Success!", "!gasm data has for this guild has been deleted");
						}
						else{
							msgFormat.err(message,"Not Found", "!gasm data has for this guild could not be found.");
						}
						break;
					}
					case "help":{
						showHelp(message);
					}
				}
			}
		}
        else
        {
            msgFormat.err(message, "ERROR!","Sorry, this module is not enabled here.");
        }
    }

}




//====== HELPER METHODS ======
async function createDB (client, Enmap, Provider){
	client.gasmDB = new Enmap({
		provider: new Provider({
			name: "gasmDB"
		})
	});
}

function addDefaultDB(client,guildKey){
	client.gasmDB.set(guildKey, {
		folderPath : "[Blank]",
		//currNumPics : "cnp-",
		arrPaths : []
	});
}


function showHelp(message){
    message.channel.send("!gasm allows a server to upload a random picture from a folder on the host's computer. If something goes wrong, contact the Bot Admin: `Neel#2970` \n__**The following sub commands are available for use:** __")
    const embed = {
        "title": "!gasm help",
        "color": 16098851,
        "fields": [
          {
            "name": "!gasm",
            "value": "Uploads a random picture from a designated folder."
          },
          {
            "name": "setpath <path> || tracefolder <path>",
            "value": "Sets the new path and analyzes the folder for future use"
          },
          {
            "name": "getpath",
            "value": "Returns the current path"
          },
          {
            "name": "delFromDB",
            "value": "WARNING: This deletes the server's entry from the !gasm database, you will need to set it up again."
          },
          {
            "name": "help",
            "value": "Shows this message again"
          }
        ]
      };

    message.channel.send({embed});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "gasm",
    category: "Module-based Commands | requires enabling for each server",
    description: "posts a random picture of the person you choose",
    usage: "!gasm OR\n !gasm setpath <path> \n !gasm [tracepath|getpath]"
};
