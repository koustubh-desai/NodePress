/*
 * 
 * Author   : Koustubh Desai
 * Version  : 0.0.1
 * Filename : core.js
 * Task 1:
 *  1. Create a server on port which just sends hi and closes the connection. Done
 *  2. serve html,css,js and images. WIP
 *  3. handles ajax requests. returns a simple json on form submit
 * 
 * 
 * Task 2: Create Objects and monitor memory
 * Task 3: Connect to DB and interact
 * Task 4: Create a monitoring tool to see how many servers are running 
 *         and how many requests are they handling. Also how much memory are they consuming
 * Task 5: Create a login Module
 * 
 * Good Refs: https://blog.risingstack.com/your-first-node-js-http-server/
 * 
 * */
 


 /*global.blast = function(){
  var arg = arguments[0];
  if(typeof(arg) !== 'object') return 'hey not an object';
  for(var i in arg){
    console.log(i,' is ',arg[i]);
  } 
}*/
/*console.log(process.argv);

var debug = require('./debug.js');*/
/* START: ExpressJS code
 * var express = require('express'),
app = express(),
port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));
app.listen(port);
* END: ExpressJS Code
* */
const server = require('./modules/init.js');
console.log(server);
server.start(2000);
