var dh = require("./base/dataHandler.js");

function upload(u, request, response){
	console.log("upload handle used: query="+u.query);
	var filename = "/logs/test1.png";
	dh.saveFile(request, filename, function(err, fields, files){
		var body = "received image:<br/><img src='/image-show' />";
		dh.write(response, body);
	});
}

function imageShow(u, request, response){
	console.log("imageShow handle used: query="+u.query);
	var filename = "/logs/test1.png";
	var filetype = "png";
	dh.readFile(filename, filetype, response);
}

function start(u, request, response){
	var body = '<form action="/file-upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>';
    dh.write(response, body);
}

function show(u, request, response){
	dh.parseFile(request, function(info){
		dh.write(response, info, true);
	});
}

exports.upload = upload;
exports.show = show;
exports.start = start;
exports.imageShow = imageShow;