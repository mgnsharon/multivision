var mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    console.log('multivision db opened');
  });

  var  userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    username: String
  });

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      User.create({fname: 'Ben', lname: 'Dover', username: 'bdover'});
      User.create({fname: 'Ipee', lname: 'Freely', username: 'ipfreely'});
      User.create({fname: 'Juan', lname: 'Valdez', username: 'jvaldez'});
    }
  });

}