var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function () {
    console.log('multivision db opened');
  });

  var  userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    salt: String,
    hashedPwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function (pwdToMatch) {
      return hashPwd(this.salt, pwdToMatch) === this.hashedPwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      var salt, hash;

      salt = createSalt();
      hash = hashPwd(salt, 'pgibbons');
      User.create({fname: 'Peter', lname: 'Gibbons', username: 'pgibbons', salt: salt, hashedPwd: hash, roles: ['admin']});
      salt = createSalt();
      hash = hashPwd(salt, 'mbolten');
      User.create({fname: 'Michael', lname: 'Bolten', username: 'mbolten', salt: salt, hashedPwd: hash, roles: []});
      salt = createSalt();
      hash = hashPwd(salt, 'jvaldez');
      User.create({fname: 'Juan', lname: 'Valdez', username: 'jvaldez', salt: salt, hashedPwd: hash});
    }
  });

  function createSalt() {
    return crypto.randomBytes(128).toString('base64');
  }

  function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
  }
};

