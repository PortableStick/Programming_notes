//Asynchronous === non-blocking
//Synchronous === blocking

/**************************
Basic setup
**************************/


/* Create an HTTP object
================================ */

var http = require('http');

/* create a server
================================ */

http.createServer(function(request,response){
	/*Sets up a server.  Handles http request/response objects*/
	response.writeHead(
			200,	//Sets the http code
			{
				//Second argument is an object
				//that sets http header properties
				'Content-Type': 'text/plain'
			}
		);
	response.write('<h1>A bunch of stuff for the body</h1>');
	response.end(); //This signals that the response header/body has been sent; message complete
}).listen(3000, "127.0.0.1");	//Passes the port number and ip address on which to listen

/*In a console, start with 'node <filename>.js'*/


/**************************
Routing
**************************/

//Start with requiring the URL module

var url = require('URL');

http.createServer(function(request,response){
	/*Stuff*/
	var pathname = url.parse(request.url).pathname;
	if(pathname === '/'){
		response.writeHead(200,{		//always need a writeHead
			'Content-Type': 'text/plain'
		});
		/*Display the home page*/
		response.end();					//needs a response.end()
	} else if (pathname === '/something'){	
		response.writeHead(200,{
			'Content-Type': 'text/plain'
		});
		/*Display the something page*/
		response.end();
	} else if /*...*/
});


/**************************
Packages	
**************************/

/* Install modules
================================ */

>npm install [module_name]

/*Installed modules need to be required*/

var moduleName = require([module_name]);

/*Modules can be installed globally for use outside of the project*/

>npm install -g [module_name]

/*Install package dependencies for the project as defined
in package.json*/

>npm install