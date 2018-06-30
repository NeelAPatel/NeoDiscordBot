//point system

const Enmap = require("enmap");
const Provider = require("enmap-sqlite");
​
client.points = new Enmap({provider: new Provider({name: "points"})});

client.on("message", message => {
    if (message.author.bot) 
        return; // if its a bot, dont do anything        
    if (message.guild) {
        //if its in the server, do stuff


        
      // Let's simplify the `key` part of this.
      const key = `${message.guild.id}-${message.author.id}`; // key for per user. 


      if(!client.points.has(key)) {
        client.points.set(key, {
          user: message.author.id,
          guild: message.guild.id, 
          points: 0, 
          level: 1
        });
      }
      let currentPoints = client.points.getProp(key, "points");
      client.points.setProp(key, "points", currentPoints++);
    }
    // Rest of message handler
  });