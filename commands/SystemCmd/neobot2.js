exports.run = async (client, message, args, level) => {
    //External
    var msgFormat = require('../../modules/funcStatusMsg.js');
    //For Error messages
    process.on('unhandledRejection', (e) => {
        console.log(e.stack)
        var msgFormat = require('../../modules/funcStatusMsg.js')
        msgFormat.err(message,"Error!", e.stack)
    });
    const fs = require("fs"); //file reading
    var path = require('path');
    //TESTING
    var walk = function(dir, done) {
		var results = [];
		fs.readdir(dir, function(err, list) {
			if (err) 
				return done(err);
			var pending = list.length;
			if (!pending) 
				return done(null, results);
			list.forEach(function(file) {
				
				file = path.resolve(dir, file);
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function(err, res) {
							results = results.concat(res);
							if (!--pending) done(null, results);
						});
					} else {
						results.push(file);
						if (!--pending) 
							done(null, results);
					}
				});
			});
		});
    };

    if (!args[0]){
        //no args
        // show possible sub commands
    }
    else{
        let response = null;
        switch(args[0]){
            case "load":{
                loadCmd(args, client, message);
                break;
            }
            case "reload":{
                reloadCmd(args, client, message);
                break;
            }
            case "enable":{
                break;
            }
            case "disable":{
                break;
            }
            case "setupModuleDB":{
                break;
            }
            
            case "modules":{
                break;
            }
            case "stats":{ //Works
                dispStats(client,message);
                break;
            }           
        }
    }
}

async function loadCmd(args, client, message){
    var msgFormat = require('../../modules/funcStatusMsg.js');
    let response = null;
    response = await client.loadCommand(args[1]);
    if (response)  
        return msgFormat.err(message,"Error!", `Error Loading: ${response}`);

    msgFormat.status(message,"Success!", `The command \`${args[1]}\` has been loaded`);
}
async function reloadCmd(args, client, message){
    var msgFormat = require('../../modules/funcStatusMsg.js');
    let response = null;
    response = await client.unloadCommand(args[1]);
    if (response) 
        return msgFormat.err(message,"Error!", `Error unloading: ${response}`);

    response = client.loadCommand(args[1]);
    if (response)  
        return msgFormat.err(message,"Error!", `Error Loading: ${response}`);

    msgFormat.status(message,"Success!", `The command \`${args[1]}\` has been reloaded`);
}
function dispStats(client, message){
    const { version } = require("discord.js");
    const moment = require("moment");
    require("moment-duration-format");
    
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send(`= STATISTICS =
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    • Uptime     :: ${duration}
    • Users      :: ${client.users.size.toLocaleString()}
    • Servers    :: ${client.guilds.size.toLocaleString()}
    • Channels   :: ${client.channels.size.toLocaleString()}
    • Discord.js :: v${version}
    • Node       :: ${process.version}`, {code: "asciidoc"});
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "neobot2",
    category: "System",
    description: "Tools for controlling the bot itself.",
    usage: "!neobot2 <args>"
};