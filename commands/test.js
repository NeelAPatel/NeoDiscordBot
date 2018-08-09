exports.run = async (client, message, args, level) => {
    	//TESTING
    var msgStatus = require('../modules/funcStatusMsg.js');
    
    switch(args[0]){
        case "status":
        {
            message.channel.send ("running status...");
            msgStatus.errorMsg(message,args[1], args[2], args[3], args[4]);
            message.channel.send ("status finished");
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "test",
    category: "Miscelaneous",
    description: "Testing certain bits of code",
    usage: ":P"
};
