/**
 * Created by csharon on 3/25/14.
 */
describe('mv.Identity', function () {
  var user;
  beforeEach(module('mv.Identity'));
  beforeEach(module('mv.model.User'));

  describe('currentUser', function () {

    it('should be undefined by default', inject(function (mvIdentity) {
      expect(mvIdentity.currentUser).to.not.be.defined;
    }));

  });

  describe('isAuthenticated', function () {
    beforeEach(inject(function (MVUser) {
      user = MVUser({});
    }));

    it('should return false when currentUser is undefined', inject(function (mvIdentity) {
      expect(mvIdentity.isAuthenticated()).to.be.false;
    }));

    it('should return true when currentUser is defined', inject(function (mvIdentity) {
      mvIdentity.currentUser = user;
      expect(mvIdentity.isAuthenticated()).to.be.true;
    }));
  });

  describe('isAuthorized', function () {
    beforeEach(inject(function (MVUser) {
      user = MVUser({});
    }));

    it('should return false when currentUser is undefined', inject(function (mvIdentity) {
      expect(mvIdentity.isAuthorized('admin')).to.be.false;
    }));

    it('should return false when currentUser is not an admin', inject(function (mvIdentity) {
      mvIdentity.currentUser = user;
      expect(mvIdentity.isAuthorized('admin')).to.be.false;
    }));

    it('should return false when currentUser has a role thats a substring', inject(function (mvIdentity) {
      mvIdentity.currentUser = user;
      mvIdentity.currentUser.roles.push('adminuser');
      expect(mvIdentity.isAuthorized('admin')).to.be.false;
    }));

    it('should return true when currentUser is an admin', inject(function (mvIdentity) {
      mvIdentity.currentUser = user;
      mvIdentity.currentUser.roles.push('admin');
      expect(mvIdentity.isAuthorized('admin')).to.be.true;
    }));
  });
});