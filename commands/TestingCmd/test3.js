exports.run = async (client, message, args, level) => {
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
        message.channel.send("No command to search for... try again")
    }
    else{
        var commandName = args[0];

        message.channel.send("Command to search for is: " + commandName);

        walk("./commands/", function(err, results) {
            if (err) throw err;
            //console.log(results);
            //console.log(require('path').dirname(require.main.filename))
            results.forEach(f => {
                //console.log(f);
                currDir = require('path').dirname(require.main.filename);
                f = f.replace(currDir  + '/commands/', '');
                //console.log('[NEW] ' +  f);
                if (!f.endsWith(commandName + ".js")) 
                    return;
                else{
                    console.log("../commands/" + f);    
                }
    
                //console.log(f);
                //const response = client.loadCommand(f); //loads the command and if a response is produced, print it out
                // if (response) 
                //     console.log(response);
            });
        });
    }

}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: "User"
};

exports.help = {
name: "test3",
category: "Miscelaneous",
description: "Testing certain bits of code",
usage: ":P"
};
