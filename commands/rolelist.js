//FULLY WORKS :DD READY FOR DEPLOYMENT!

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var guild = message.guild;
    
    //checks if guild has over 250 members
    if (guild.large){
        try {
            await guild.fetchMembers();
        }
        catch (e) {
            console.log(e);
        }
    }  

    let rolesMapped = guild.roles.map(role => `${role} has ${role.members.size} members.`);
    let hugeRolesString = rolesMapped.join('\n');

    
    message.channel.send({embed: { // not sure about raw embeds here, I never use em
        color: 9585100,
        description: hugeRolesString,
        footer: {
            text: "~ Fear the Attic Wizard ~"
        }
    }});
    

    //var guildID = guild.id; // claudia: 353194810770849794 // neel: 403778293498642435

    // Fetch guild members
    
    //message.channel.send(`GUILD ID: ${guildID}`);
   
   /* console.log(`GUILD ID: ${guildID}`);
    message.channel.send(`GUILD ID: ${guildID}`);
    message.channel.send(`GUILD ROLES: ${guild.roles}`);
    message.channel.send(`GUILD ROLES: ${guild.roles.size}`);

     let roleID = "460368978305482752"; //Admin 
    let membersWithRole = message.guild.roles.get(roleID).members;
    console.log(`Got ${membersWithRole.size} members with that role.`);
    guild.roles.map(role => `${role} has ${role.members.size} members.`);
    let myRole = message.guild.roles.find("name", "Jedi Council");
    console.log(`ROLE : ${myRole}`);
    //console.log(`ROLE ID: ${myRole.id}`);
    let myRole2 = message.guild.roles.find("name", "Jedi Council");
    let myRole3 = message.guild.roles.find("name", "Moderators");

    */
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "rolelist",
    category: "Miscelaneous",
    description: "Lists all the roles in order of creation and the # of ppl in it",
    usage: "rolelist"
};