angular.module('services')
  .service('ProjectsService',['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/projects/:ids');
  }]);