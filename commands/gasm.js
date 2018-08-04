exports.run = async(client, message, args, level) => {
    
    // Key = numeric identifier of the current guild
    const guildKey = `g-${message.guild.id}`;

    if (!(client.cmdDB.has(guildKey))) // if the 
    {

    }


}




//====== HELPER METHODS ======
async function createDB (client, Enmap, Provider){
	client.gasmDat = new Enmap({
		provider: new Provider({
			name: "gasmDat"
		})
	});
}

function addDefaultDB(client,guildKey){
	client.gasmDat.set(guildKey, {
		folderPath : "[Blank]",
		//currNumPics : "cnp-",
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
    name: "gasm",
    category: "Miscelaneous",
    description: "posts a random picture of the person you choose",
    usage: "!gasm OR\n !gasm setpath <path> \n !gasm [tracepath|getpath]"
};
