exports.run = async(client, message,args,level)=>{
    if (!args || args.length < 1)
    {
        // show list of possible commands
    }
    else
    {
        var cmdType = args[0];
        switch (cmdType){
            case "reboot":{
                await message.reply("Bot is shutting down.");
                client.commands.forEach( async cmd => {
                    await client.unloadCommand(cmd);
                });
                process.exit(1);
                break;
            }
            case "stats":{
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
        }
    }
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["botx"],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "neobot",
    category: "System",
    description: "Tools for controlling the bot itself.",
    usage: "\nneobot [load|reload|unload][command]"
};
  