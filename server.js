const finalhandler = require('finalhandler');
const http = require('http');
const cors = require('http-cors');
const serveStatic = require('serve-static');

const serve = serveStatic(__dirname + '/static');

const server = http.createServer(function onRequest(req, res) {
  if (cors(req, res)) return;
  serve(req, res, finalhandler(req, res));
});
server.listen(8080);