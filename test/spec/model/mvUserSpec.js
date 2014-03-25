describe('mvUser', function () {
  var user;
  beforeEach(module('mv.model.User'));

  beforeEach(inject(function (MVUser) {
    user = MVUser({});
  }));

  describe('hasRole', function () {

    it('should by default have no roles', function () {
      expect(user.roles.length).to.equal(0);
    });

    it('should return true for admin for admin users', function () {
      user.roles.push('admin');
      expect(user.hasRole('admin')).to.be.true;
    });

    it('should return false for admin for non-admin users', function () {
      expect(user.hasRole('admin')).to.be.false;
    });

    it('should return false if roles is not defined', function () {
      user.roles = undefined;
      expect(user.hasRole('admin')).to.be.false;
    });

    it('should return false if roles is not an array', function () {
      user.roles = 'admin';
      expect(user.hasRole('admin')).to.be.false;
      user.roles = null;
      expect(user.hasRole('admin')).to.be.false;
    });

  });

  describe('fullName', function () {

    it('should return the users first and last name seperated by a space', function () {
      user.fname = 'Frank';
      user.lname = 'Zane';
      expect(user.fullName()).to.equal("Frank Zane");
    });

    it('should return the users first name if last name is undefined', function () {
      user.fname = 'Frank';
      user.lname = undefined;
      expect(user.fullName()).to.equal("Frank");
    });

    it('should return the users last name if first name is undefined', function () {
      user.fname = undefined;
      user.lname = 'Zane';
      expect(user.fullName()).to.equal("Zane");
    });

  });

});