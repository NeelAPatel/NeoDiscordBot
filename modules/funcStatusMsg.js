var methods = {


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