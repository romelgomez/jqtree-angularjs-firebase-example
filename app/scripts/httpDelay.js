'use strict';

/**
 * http://www.bennadel.com/blog/2802-simulating-network-latency-in-angularjs-with-http-interceptors-and-timeout.htm
 */
angular.module('httpDelay',[])
  .config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push( httpDelay );

    // I add a delay to both successful and failed responses.
    function httpDelay( $timeout, $q ) {

      var delayInMilliseconds = 3000;

      // Return our interceptor configuration.
      return({
        response: function(response){
          // I intercept successful responses.
          var deferred = $q.defer();
          $timeout(
            function() {
              deferred.resolve( response );
            },
            delayInMilliseconds,
            // There's no need to trigger a $digest - the view-model has
            // not been changed.
            false
          );
          return( deferred.promise );
        },
        responseError: function (response){
          // I intercept error responses.
          var deferred = $q.defer();
          $timeout(
            function() {
              deferred.reject( response );
            },
            delayInMilliseconds,
            // There's no need to trigger a $digest - the view-model has
            // not been changed.
            false
          );
          return( deferred.promise );
        }
      });

    }

  }]);
