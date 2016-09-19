var exec = require("child_process").exec;
var dh = require("./base/dataHandler.js");

function dir(u, request, response){
	console.log("dir handle used: query="+u.query);
	exec("dir",{encoding:"binary"}, function(error, stdout, stderr){
		dh.head200(response);
		response.write(stdout);
		response.end();
	});
}

exports.dir = dir;