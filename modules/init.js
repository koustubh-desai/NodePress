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
	/***************************BEGIN: AJAX Hanlder**************************************/
	var slash = request.url.split('/');
	if(slash[1] == 'ajax' || (request.headers['x-requested-with'] == 'XMLHttpRequest')){
		response.writeHead(200, {'Content-Type': mimeTypes['json']} );
		switch(slash[2]){
			case 'bob':
				console.log('in bob');
				response.write(JSON.stringify({ a: 1 }, null, 3));
				break;
			case 'marley':
				console.log('in maarley');
				response.write(JSON.stringify({ 'kiko':'mimo','lilo':'nano' }));
				break;
			case 'clapton':
				console.log('in clapton');
				response.write(JSON.stringify(fs));
				break;
			default:
				console.log('in clapton');
				response.write(JSON.stringify({ 'kiko':'wallah','lilo':'illah' }));
				break;
		}
		response.end();
		return;
	} 
	/***************************END  : AJAX Hanlder**************************************/
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
 
