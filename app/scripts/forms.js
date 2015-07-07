'use strict';

angular.module('forms',[])
  .directive('noSpecialChars', function() {
    return {
      restrict:'A',
      require : 'ngModel',
      link : function(scope, element, attrs, ngModel) {
        ngModel.$validators.noSpecialChars = function(input) {
          // a false return value indicates an error
          return (String(input).match(/[^a-zá-źA-ZÁ-Ź0-9\s]/g)) ? false : true;
        };
      }
    };
  });
