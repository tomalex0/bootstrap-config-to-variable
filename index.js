var fs = require('fs');
var obj;

var lessfile = 'variables.less';
var file = 'config.json';

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);



    if( fs.existsSync('./'+lessfile)) {
        fs.unlinkSync('./'+lessfile);
    }
    console.log('--------------------------------');
    console.log('Total number of variables = '+Object.keys(obj.vars).length)
    console.log('--------------------------------');
    var i = 0;
    for(item in obj.vars){
        console.log(item,(obj.vars)[item]);
        var lessvar = item+'  :  '+(obj.vars)[item];
        fs.appendFileSync('./'+lessfile, lessvar + "\n");
        i++;
    }

    console.log('--------------------------------');
    console.log('Total items written = '+i);
    console.log('--------------------------------');

});

process.on('exit', function(code) {
    console.log('*********** config to less conversion is completed ***********');
});

