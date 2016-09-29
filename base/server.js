var http = require("http");

var port = "8889";

function start(route, handles){
	http.createServer(function(request, response){
		route(handles, request, response);
	}).listen(port);
	console.info("server start");
}

exports.start=start;
