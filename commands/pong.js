exports.run = (client, message, args) => {
    message.channel.send("ponggeadfasdfasdfrs!").catch(console.error);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "pong",
    category: "Miscelaneous",
    description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
    usage: "pong"
  };