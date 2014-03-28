
var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getAll = function (req, res) {
  User.find({}).exec(
    function (err, collection) {
      res.send(collection);
    }
  );
};