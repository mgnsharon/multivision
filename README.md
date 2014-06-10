multivision
===========

MEAN Stack Demo App based on [Pluralsight's](http://pluralsight.com/training/courses/TableOfContents?courseName=building-angularjs-nodejs-apps-mean) course on Building AngularJS and Node.js Apps with the MEAN Stack.

#### Main Differences:
* Converted to ExpressJS 4
* Uses Jade, however templates are compiled by Gulp.js, so no server side rendering is needed.
* Has separate directories for server and client
* Uses Gulp for dev tasks
* Uses Restangular instead of $resource
* Uses Angular-ui-router instead of Angular-route
* Uses Protractor instead of Scenario
* Uses Mocha instead of Jasmine
* Uses Sass Bootstrap & Compass instead of Stylus
* Uses Font-Awesome

#### Requirements
* Node
* Local installation of mongodb

#### Running the Application
````
npm install && bower install
gulp dev

````





