// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-22 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/pnotify/pnotify.core.js',
      'bower_components/pnotify/pnotify.buttons.js',
      'bower_components/pnotify/pnotify.callbacks.js',
      'bower_components/pnotify/pnotify.confirm.js',
      'bower_components/pnotify/pnotify.desktop.js',
      'bower_components/pnotify/pnotify.history.js',
      'bower_components/pnotify/pnotify.nonblock.js',
      'bower_components/angular-pnotify/src/angular-pnotify.js',
      'bower_components/angular-busy/dist/angular-busy.js',
      'bower_components/angular-uuid-service/angular-uuid-service.js',
      'bower_components/angular-validation-match/dist/angular-input-match.min.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/dropzone/dist/min/dropzone.min.js',
      'bower_components/uri.js/src/URI.js',
      'bower_components/uri.js/src/IPv6.js',
      'bower_components/uri.js/src/SecondLevelDomains.js',
      'bower_components/uri.js/src/punycode.js',
      'bower_components/uri.js/src/URITemplate.js',
      'bower_components/uri.js/src/jquery.URI.js',
      'bower_components/uri.js/src/URI.min.js',
      'bower_components/uri.js/src/jquery.URI.min.js',
      'bower_components/uri.js/src/URI.fragmentQuery.js',
      'bower_components/uri.js/src/URI.fragmentURI.js',
      'bower_components/jqtree/tree.jquery.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
