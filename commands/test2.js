exports.run = async (client, message, args, level) => {
    //TESTING
    
    var msgFormat = require('../modules/funcStatusMsg.js');
    process.on('unhandledRejection', (e) => { 
        //console.log(e.stack)} 
        var msgFormat = require('../modules/funcStatusMsg.js')
        msgFormat.err(message,"Error!", e.stack)
    });

    dafasd
    msgFormat.status(message, "UserInfo/Server Info", 
    "ServerName " + `${message.guild.name}` + "\n" + 
    "ServerID " + `${message.guild.id}` + "\n" +
    "UserName " + `${message.author.name}` + "\n" +
    "UserDisplayName " + `${message.member.displayName} ` + "\n" +
    "UserPermissionLevel " + `${client.config.permLevels.find(l => l.level === level).name}`  + "\n" +
    "UserID " + `${message.author.id}` + "\n")
}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "test2",
category: "Miscelaneous",
description: "Testing certain bits of code",
usage: ":P"
};
