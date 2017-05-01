angular.module('services')
  .service('RegisterService',['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/register');
  }]);