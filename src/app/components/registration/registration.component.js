angular.module('components')
  .component('formRegister', {
    templateUrl: 'app/components/registration/registration.template.html',
    controller: ['$window','RegisterService', function ($window, RegisterService) {
      var self = this;
      this.showForm = true;
      this.email = '';
      this.password = '';
      this.confirmedPassword = '';
      this.register = function (form) {
        if(this.password !== this.confirmedPassword){
          this.error = "Password and confirmed password don't equal";
        }else if(this.password.length < 4){
          this.error = "Password doesn't have enough length. Minimum length is 4";
        }else{
          var result = RegisterService.save({email: this.email, password: this.password},function () {
            if(result.success){
              self.error = undefined;
              self.success = result.msg;
              self.showForm = false;
              setTimeout(function () {
                $window.location.href = '/'
              },2000);
            }else{
              self.error = result.msg;
            }
          });
        }
      };
    }]
  });
