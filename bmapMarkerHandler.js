var dh = require("./base/dataHandler.js");

function saveShop(u, request, response){
	dh.json(request, function(data,err){
		console.log(data);
		//console.log(JSON.parse(data));
	});
}

function saveShopInfo(u, request, response){
	dh.json(request, function(data){
		console.log(data);
		//console.log(JSON.parse(data));
	});
}

exports.saveShop=saveShop;
exports.saveShopInfo=saveShopInfo;