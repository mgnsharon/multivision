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
      hash = hashPwd(salt, 'bdover');
      User.create({fname: 'Ben', lname: 'Dover', username: 'bdover', salt: salt, hashedPwd: hash, roles: ['admin']});
      salt = createSalt();
      hash = hashPwd(salt, 'ipfreely');
      User.create({fname: 'Ipee', lname: 'Freely', username: 'ipfreely', salt: salt, hashedPwd: hash, roles: []});
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

