angular.module('components')
  .component('formAuth', {
    templateUrl: 'app/components/authorization/authorization.template.html',
    controller: ['$window','AuthService', function ($window, AuthService) {

      if($window.localStorage.getItem('clientToken')){
        $window.location.href = '#!/projects';
      }

      var self = this;
      this.email = undefined;
      this.password = undefined;

      this.login =  function () {
        var result = AuthService.save({email: this.email, password: this.password},function () {
          self.token = result.token;
          if(result.success && result.token){
            $window.localStorage.setItem('clientToken', result.token);
            $window.localStorage.setItem('email', self.email);
            $window.location.href = '#!/projects';
          }else{
            self.error = result.msg;
          }
        });
      };

    }]
  });
