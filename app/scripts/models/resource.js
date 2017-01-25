'use strict';

/**
 * @ngdoc service
 * @name App.service:Resource
 * @requires lodash
 *
 * @description
 * Resouce model to handle queries against restful API
 */

angular
  .module('App')
  .factory('Resource', ResourceModel);

ResourceModel.$inject = [];

function ResourceModel () {


  var Resource = function (baseUrl) {
    this.base = baseUrl;
    this.endpoint = '';
  };

  /**
   * Serialize the resource model to a URL
   */
  Resource.prototype.toURL = function () {
    this.endpoint =  this.base + '?' + this.query.join('&');
    return this;
  };


  Resource.prototype.replace = function(some) {
    var url = this.endpoint || this.base;
    var match = url.match(/%s/g);

    //if string of number
    if ((angular.isString(some) || angular.isNumber(some)) &&
      match &&
      match.length === 1)
    {
      url = url.replace(/%s/, some);
    }

    //if array
    if (angular.isArray(some) &&
      match &&
      match.length === some.length)
    {

      angular.forEach(some, function(item){
        url = url.replace(/%s/, item);
      });
    }

    this.endpoint = url;

    return this;
  };


  return Resource;
}
