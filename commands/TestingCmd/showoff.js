exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    message.channel.send("Hey dishant :P")
    message.channel.send("https://www.instagram.com/d_shah14/")
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "showoff",
    category: "Miscelaneous",
    description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
    usage: "ping"
  };