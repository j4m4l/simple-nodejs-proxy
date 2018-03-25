var express = require('express');  
var request = require('request');


// host address of server which will be proxied
var serverHost = undefined;
if (process.argv == null || process.argv.length >= 3)
  serverHost = process.argv[2];

if (serverHost == undefined) 
  throw new Error('specify host of server which will be proxied');

var app = express();  
app.use('/', function(req, res) {
  var url = serverHost + req.url;
  console.debug(req.url + ' --> ' + url);
  req.pipe(request(url)).pipe(res);
});

var DEFAULT_PORT = 3000;
console.info('listening on http://localhost:' + DEFAULT_PORT + ' proxying ' + serverHost);
app.listen(process.env.PORT || DEFAULT_PORT);