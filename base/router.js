var url = require("url");

//路由是用来处理请求的
function route(handles, request, response){
	var u = url.parse(request.url);
	console.info("router used: pathname="+u.pathname);
	if(typeof handles[u.pathname]==="function"){
		handles[u.pathname](u, request, response);
	}else{
		console.error("handle is not a function's array'");
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 not found");
		response.end();
	}
}

exports.route=route;