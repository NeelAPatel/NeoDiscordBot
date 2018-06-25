exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]){
        // no arguments == show claudia
        message.channel.send("claudiagasm");
    }   
    else if (args[0] === "setpath" && args[1]){
        message.channel.send(`claudia + ${args[1]}`);
    }
    else if (args[0] === "tracepath"){
        message.channel.send("path traced");
    }
    else if (args[0] === "getpath"){
        message.channel.send("path got");
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