var server = require("./base/server");
var router = require("./base/router");
var simpleHandler = require("./simpleHandler");
var systemHandler = require("./systemHandler");
var uploadHandler = require("./uploadHandler");
var bmapMarkerHandler = require("./bmapMarkerHandler");

var handles = {};
handles["/"] = simpleHandler.start;
handles["/start"] = simpleHandler.start;
handles["/show"] = simpleHandler.show;
handles["/dir"] = systemHandler.dir;
handles["/file-upload"] = uploadHandler.upload;
handles["/file-show"] = uploadHandler.show;
handles["/file-start"] = uploadHandler.start;
handles["/image-show"] = uploadHandler.imageShow;
handles["/bmap-marker-saveShop"] = bmapMarkerHandler.saveShop;
handles["/bmap-marker-saveShopInfo"] = bmapMarkerHandler.saveShopInfo;

server.start(router.route, handles);