
var rootPath = process.env.PWD = process.cwd();

console.log('App rootPath: ' + rootPath);
console.log('Dev webRoot: ' + rootPath.concat('/build/public'));
console.log('Prod webRoot: ' + rootPath.concat('/public'));

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/multivision',
    port: process.env.PORT || 3030,
    webRoot: rootPath.concat('/build/public')
  },

  production: {
    rootPath: rootPath,
    db: process.env.MONGOHQ_URL,
    port: process.env.PORT || 80,
    webRoot: rootPath.concat('/public')
  }
};