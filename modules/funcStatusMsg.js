var methods = {
    statusMsg: function(message, status, msgTitle, msgMain, msgFooter){
        var clr = 8311585;
        if (status == "grn"){
            clr = 8311585;
        }
        else if (status == "red"){
            clr = 13632027;
        }
    
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
    },

    status: function (message, msgTitle, msgMain){
        const embed = {
            "title": msgTitle,
            "description": msgMain,
            "color": 8311585,
            
            };
            message.channel.send({ embed });
    },

    err: function (message, errTitle, errMsg){
        const embed = {
            "title": errTitle,
            "description": errMsg,
            "color": 13632027,
            
          };
          message.channel.send({ embed });
    }
}

module.exports = methods;