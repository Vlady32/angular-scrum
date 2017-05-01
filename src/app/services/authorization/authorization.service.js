angular.module('services')
  .service('AuthService',['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/authenticate');
  }]);