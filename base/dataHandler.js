/**
 * 在项目根目录下，先安装formidable，支持文件上传：npm install formidable
 * formidable@1.0.17 node_modules\formidable表示安装成功
 * */
var util = require("util");
var fs = require("fs");
var formidable = require("formidable");
 
var coding = "utf8"

function form(request, callback){
	request.setEncoding(coding);
	var data = "";
	//因为只有一个线程，addListener是非阻塞的，每次只能收集form的一部分，所以要拼接
	request.addListener("data",function(chunk){
		data += chunk;
		console.info("receive post chunk: "+chunk);
	});
	//end会拿到所有chunk拼接的postData
	request.addListener("end", function(){
		callback(data);
		console.info("receive post end: "+data);
	});
}

function write(response, body){
	write(response, body, false);
}

function write(response, body, isPlain){
	if(isPlain) headPlain200(response);
	else head200(response);
	response.write(body);
	response.end();
}

function saveFile(request, filename, callback){
	var form = new formidable.IncomingForm();
	form.uploadDir = "."; // nodejs的安装盘符和写入的盘符不是一个时，会报：cross-device link not permitted，需要设置uploadDir时写入的盘符
	form.parse(request, function(err, fields, files){
		fs.renameSync(files.upload.path, filename);
		callback(err, fields, files);
	});
}

function readFile(filename, filetype, response){
	fs.readFile(filename, function(err,file){
		if(err){
			response.writeHead(500, {"Content-Type": "text/plain"});
		    response.write(err + "\n");
		    response.end();
		}else{
			response.writeHead(200, {"Content-Type": "image/"+filetype});
			response.write(file, "binary");
			response.end();
		}
	});
}

function parseFile(request, callback){
	if(request.method.toLowerCase()=="post"){
		var form = formidable.IncomingForm();
		form.parse(request, function(err, fields, files){
			var info = util.inspect({fields:fields, files:files});
			callback(info);
		});
	}
}

function head200(response){
	response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
}

function headPlain200(response){
	response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
}

exports.form = form;
exports.write = write;
exports.head200 = head200;

exports.saveFile = saveFile;
exports.readFile = readFile;
exports.parseFile = parseFile;