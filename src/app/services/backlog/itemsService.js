angular.module('services')
  .service('ItemsService', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/api/projects/:project_id/sprints/:sprint_id/items/:item_id',
      {
        project_id:'@project',item_id:'@item_id', sprint_id: '@sprint_id'
      },
      {
        'update': { method:'PUT' }
      }
    );
  }]);