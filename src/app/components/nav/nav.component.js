angular.module('components')
  .component('scrumNav', {
      templateUrl: 'app/components/nav/nav.template.html',
      controller: ['$window','$location', function ($window,$location) {
        this.email = $window.localStorage.getItem('email');
        this.isExtendedLogo = false;
        this.isProjectsItem = $location.path().search(/projects/i) !== -1;
        this.isSettingsItem = $location.path().search(/settings/i) !== -1;

        this.toggleExtendedLogo = function () {
          this.isExtendedLogo = !this.isExtendedLogo;
        };

        this.logout = function () {
          $window.localStorage.clear();
          $window.location.href = '#!/auth';
        };

      }]
  });