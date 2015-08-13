var fs = require('fs');
var obj;

var lessfile = 'variables.less';
var file = 'config.json';

var missingitmes  = {
    "@zindex-navbar":            1000,
    "@zindex-dropdown":          1000,
    "@zindex-popover":           1060,
    "@zindex-tooltip":           1070,
    "@zindex-navbar-fixed":      1030,
    "@zindex-modal-background":  1040,
    "@zindex-modal":             1050,
    "@dl-horizontal-breakpoint":    "@grid-float-breakpoint"
};

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    obj = merge_options(JSON.parse(data).vars,missingitmes);



    if( fs.existsSync('./'+lessfile)) {
        fs.unlinkSync('./'+lessfile);
    }
    console.log('--------------------------------');
    console.log('Total number of variables = '+Object.keys(obj).length)
    console.log('--------------------------------');
    var i = 0;
    for(item in obj){
        console.log(item,(obj)[item]);
        var lessvar = item+':  '+(obj)[item];
        fs.appendFileSync('./'+lessfile, lessvar + ";\n");
        i++;
    }

    console.log('--------------------------------');
    console.log('Total items written = '+i);
    console.log('--------------------------------');

});

process.on('exit', function(code) {
    console.log('*********** config to less conversion is completed ***********');
});

