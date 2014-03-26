/**
 * Created by csharon on 3/25/14.
 */
describe('mv.Identity', function () {
  var user;

  beforeEach(module('mv.Identity', function ($provide) {
      $provide.value('$window', {});
  }));

  describe('currentUser', function () {

    it('should be undefined by default', inject(function (mvIdentity) {
      expect(mvIdentity.currentUser).to.not.be.defined;
    }));

    beforeEach(function () {
      module(function ($provide) {
        $provide.value('$window', {
          bootstrappedUserObject: {fname:'test', lname:'user', username: 'tuser'}
        });
      });
    });

    it('should be defined if $window.bootstrappedUserObject is set', function () {

      inject(function (mvIdentity) {
        expect(mvIdentity.currentUser).to.be.defined;
      });

    });

    it('should be a MVUser', function () {
      inject(function (mvIdentity) {
        expect(mvIdentity.currentUser.fname).to.equal('test');
        expect(mvIdentity.currentUser.lname).to.equal('user');
        expect(mvIdentity.currentUser.username).to.equal('tuser');
        expect(mvIdentity.currentUser.roles).to.be.a('Array');
        expect(mvIdentity.currentUser.hasRole('admin')).to.be.false;
        expect(mvIdentity.currentUser.fullName()).to.equal('test user');
      });
    });

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