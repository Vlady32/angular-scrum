angular.module('configs')
  .factory('httpRequestInterceptor',['$window','$q', function ($window, $q) {
  return {
    request: function (config) {

      if($window.localStorage.getItem('clientToken')){
        config.headers['x-access-token'] = $window.localStorage.getItem('clientToken');
      }

      return config;
    },
    responseError: function (rejection) {
      if(rejection.status === 403){
        $window.location.href = '#!/auth';
        return $q(function () {return null;})
      }
      return $q.reject(rejection);
    }
  };
}]);