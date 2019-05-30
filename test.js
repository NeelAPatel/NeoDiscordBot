var fs = require('fs');
var path = require('path');
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
            //console.log(file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        //console.log("adfasd   " + res)
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


walk("./commands/", function(err, results) {
    if (err) throw err;
    console.log(results);
    //results = results.replace(require('path').dirname(require.main.filename) + '/commands/', '');
    console.log(require('path').dirname(require.main.filename))
    results.forEach(f => {
       // console.log(f);

        currDir = require('path').dirname(require.main.filename);
        f = f.replace(currDir + `\\commands\\`, '');
        console.log(f);
    });
    console.log(results);

  });

