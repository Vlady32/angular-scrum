angular.module('scrum')
  .config(['$locationProvider', '$stateProvider','$httpProvider','$urlRouterProvider', function($locationProvider, $stateProvider, $httpProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('httpRequestInterceptor');

    $stateProvider
      .state({
        name: 'authorization',
        url: '/auth',
        template: '<form-auth></form-auth>'
      })
      .state({
        name: 'registration',
        url: '/register',
        template: '<form-register></form-register>'
      })
      .state({
        name: 'settings',
        url: '/settings',
        template: '<settings></settings>'
      })
      .state({
        name: 'projects',
        url: '/projects',
        template: '<projects></projects>'
      })
      .state({
        name: 'project',
        url: '/projects/:project_id',
        template: '<project></project>'
      })
      .state({
        name: 'sprint',
        url: '/projects/:project_id/sprints/:sprint_id',
        template: '<sprint-scrum></sprint-scrum>'
      });

    $urlRouterProvider.when('', '/auth');

    $urlRouterProvider.otherwise('/');
  }]);
