/*
 * Author   : Koustubh Desai
 * Version  : 0.0.1
 * Filename : init.js
 * This file is intended to create a basic server and handle requests.
 * It basically provides an abstraction like express.js does.
 * 
 * 
 */
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
/* List of various assets*/
const mimeTypes = {
	'html':'text/html',
	'jpeg':'image/jpeg',
	'jpg' :'image/jpg',
	'png' :'image/png',
	'js'  :'text/javascript',
	'css' :'text/css',
	'plain':'text/plain',
	'ico' :'image/x-icon',
	'no1' :'application/octet-stream'
};
/* A single handler to */
const requestHandler = function(request,response){
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(),'www/',uri);
	/***If request is for favicon, skip***/
	if (uri === '/favicon.ico') {
		console.log('request for favico');
        response.writeHead(200, {'Content-Type': mimeTypes['ico']} );
        response.end(/* icon content here */);
        return;
    } 
    console.log(' Request for => '+filename);
    fs.lstat(filename,function(a,b){
		if(b) {			
			if(b.isDirectory()){
				console.log('request for directory');
				response.writeHead(404);
				response.end('Its a direcotry');
				return;
			}
			if(b.isFile()){
				
				var mime = mimeTypes[path.extname(filename).split('.')[1]];
				
				/********* I think I will use readFileStream instead *********/
				/*fs.readFile(filename, 'utf8',function(err,data){					
					if (err) {
						response.writeHead(404);
						response.write('Contents you are looking are Not Found');
					} else {
						response.writeHead('200',{'Content-Type':mime});
						response.write(data);
					}					
					response.end();
					return;
				});*/
				/****************** BEGIN: Part where files are served ****************/
				response.writeHead('200',{'Content-Type':mime});
				fs.createReadStream(filename,{
					'flags':'r'
				}).addListener("data",function(chunk){
					response.write(chunk);
				}).addListener( "close",function() {
					response.end();
				});
				/****************** END: Part where files are served ****************/
			}
		}
		else{
			console.log('Dont know what this is',b);
			response.writeHead(404);
			response.end('What do you want?');
			return;
		}
	});
}
var port = 3000;
this.start = function(){
	port = arguments[0]||port;
	const server = http.createServer(requestHandler);
	server.listen(port,(err)=>{
		if(err) return console.log('something bad happened on the stairway to heaven',err);
		console.log('server is listening on',port);
	});
}
 
