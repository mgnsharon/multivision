
var express = require('express'),
  stylus = require('stylus'),
  mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var APP_ROOT = process.env.PWD = process.cwd() || __dirname;
var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.configure(function() {
  app.set('views', APP_ROOT + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.static(APP_ROOT + '/public'));
  app.use(stylus.middleware(
    {
      src: APP_ROOT + '/public',
      compile: compile
    }
  ));

  app.use(express.static(APP_ROOT + '/public'));
});
if (env === 'production') {
  mongoose.connect(process.env.MONGOHQ_URL);
} else {
  mongoose.connect('mongodb://localhost/multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
  console.log('multivision db opened');
});

app.get('/partials/:partialsPath', function(req, res) {
  res.render('partials/' + req.params.partialsPath);
});

app.get('*', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');