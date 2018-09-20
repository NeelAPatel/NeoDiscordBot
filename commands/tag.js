exports.run = async (client, message, args, level) =>{
    
}

exports.conf ={
    enabled: true, 
    guildOnly: false,
    aliases: ["t"],
    permLevel: "User"
};

exports.help = {
    name: "ping", 
    category: "Module-based Commands | requires enabling for each server",
    description: "allows direct posting of custom text and links"
    usage: "!tag <item> || !tag list"
}