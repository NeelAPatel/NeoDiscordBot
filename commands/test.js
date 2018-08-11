exports.run = async (client, message, args, level) => {
    	//TESTING
    var msgFormat = require('../modules/funcStatusMsg.js');
    
    msgFormat.err(message, "errTitle","errMsg");
    msgFormat.status(message, "title","mainMsg");

    var x = args[0];
    msgFormat.status(message,"title2", `${x}`);
    msgFormat.status(message,"title3", "Hello!" + `${x}`);
    msgFormat.status(message,"title4", "Hello!\n `123`" +  `${x}`);
    msgFormat.status(message,"title5", "Hello! `" + `${x}` +"`");


    /*
    msgFormat.status(message,"Success!", );
    msgFormat.err(message, "ERROR!", );
    */

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
