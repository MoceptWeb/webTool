var http = require("http");
var url = require("url");

function start(route, handler) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handler, pathname);
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(8777);
  console.log("Server has started");
}

exports.start = start;
