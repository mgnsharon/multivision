/**
 * Created by csharon on 3/24/14.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getAll = function (req, res) {
  User.find({}).exec(
    function (err, collection) {
      res.send(collection);
    }
  )
};