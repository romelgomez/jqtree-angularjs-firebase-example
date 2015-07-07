'use strict';

angular.module('filters',[])
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  })
  .filter('slug', function() {
    return function(input) {
      return (!!input) ? String(input).replace(/[^a-zá-źA-ZÁ-Ź0-9]/g, ' ').trim().replace(/\s{2,}/g, ' ').replace(/\s+/g, '-') : '';  //  http://www.regexr.com/
    };
  })
  .filter('noSpecialChars', function() {
    return function(input) {
      return (!!input) ? String(input).replace(/[^a-zá-źA-ZÁ-Ź0-9]/g, ' ').trim().replace(/\s{2,}/g, ' ') : '';  //  http://www.regexr.com/
    };
  })
  .filter('capitalizeFirstChar', function() {
    return function(input) {
      return (!!input) ? input.trim().replace(/(^\w?)/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);}) : '';
    };
  })
  .filter('dateParse', function($filter) {
    return function(input,format,timezone) {
      return (!!input) ? $filter('date')( Date.parse(input), format, timezone) : '';
    };
  })
  .filter('stringReplace', function() {
    return function(string,changeThis,forThis) {
      return string.split(changeThis).join(forThis);
    };
  })
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });
