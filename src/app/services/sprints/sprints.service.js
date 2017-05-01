angular.module('services')
  .service('SprintsService', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/projects/:project_id/sprints/:sprint_id',
      {
        project_id:'@project_id',sprint_id:'@sprint_id'
      },
      {
        'update': { method:'PUT' }
      }
    );
  }]);