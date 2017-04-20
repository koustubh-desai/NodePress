
var fs=require('fs');
var util=require('util');
var logFile = fs.createWriteStream('logs/'+'documentation.log',{flags:'w'});
var log = process.stdout;

console.log = function(){
    logFile.write(util.format.apply(null, arguments)+'\n');
    log.write(util.format.apply(null, arguments)+'\n');
}
