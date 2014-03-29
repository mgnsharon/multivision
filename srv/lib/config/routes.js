var auth = require('./auth'),
    UserCtrl = require('../controllers/users');

module.exports = function (app) {

  app.route('/api/v1/admin/users')
    .get(auth.requiresRole('admin'), UserCtrl.getAll);

  app.route('/api/v1/session')
    .post(auth.authenticate)
    .delete(function (req, res) {
        req.logout();
        res.send(200);
      });
  
  app.route('/api/v1/session/me')
    .get(function (req, resp) {
      if (req.user) {
        resp.send(req.user);
      } else {
        resp.send(401);
      }
    });

  /*app.get('*', function (req, res) {
    res.render('index.html');
  });*/

};