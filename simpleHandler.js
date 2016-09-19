var querystring = require("querystring");
var dh = require("./base/dataHandler.js");

function start(u, request, response){
	console.log("start handle used: query="+u.query);
	var body = '<html>'+
	  '<head>'+
	  '<meta http-equiv="Content-Type" content="text/html; '+
	  'charset=UTF-8" />'+
	  '</head>'+
	  '<body>'+
	  '<form action="/show" method="post">'+
	  '<input type="text" name="a" value="" />'+
	  '<textarea name="b" rows="20" cols="60"></textarea>'+
	  '<input type="submit" value="Submit text" />'+
	  '</form>'+
	  '</body>'+
	  '</html>';
	 dh.write(response, body);
}

function show(u, request, response){
	console.log("show handle used: query="+u.query);
	dh.form(request, function(data){
		dh.write(response, "show b: " +querystring.parse(data).b);
	});
}

exports.start = start;
exports.show = show;