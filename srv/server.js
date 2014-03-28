
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./lib/config/config')[env];

require('./lib/config/express')(app, config);
require('./lib/config/mongoose')(config);
require('./lib/config/routes')(app);
require('./lib/config/passport')();



app.listen(config.port);
console.log('Listening on port ' + config.port + '....');