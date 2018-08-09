var methods = {
    statusMsg: function(message, status, msgTitle, msgMain, msgFooter){
        var clr = 8311585;
        if (status === "grn")
            clr = 8311585;
        else (status === "red")
            clr = 13632027;
    
        const embed = {
            "title": msgTitle,
            "description": msgMain,
            "color": clr,
            "footer": {
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
              "text": msgFooter
            }
          };
          message.channel.send({ embed });
    }
}

module.exports = methods;