exports.run = async(client, message, args, level) => {
    message.channel.send("Emitting error...")
    client.emit("error")
    message.channel.send("Emit Finished")
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};
  
exports.help = {
    name: "emit",
    category: "Admin only",
    description: "Emits events",
    usage: "!emit"
};
