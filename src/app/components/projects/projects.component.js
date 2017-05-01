angular.module('components')
  .component('projects', {
    templateUrl: 'app/components/projects/projects.template.html',
    controller: ['$window','ProjectsService', function ($window,ProjectsService) {

      var self = this;
      this.isShowTable = false;
      this.isShowAdditSection = false;

      this.remove = function () {
        if($window.confirm('Do you really want to remove projects?')){
          var projectIDs = [];
          angular.forEach(self.projects, function (project) {
            if(project.select){
              projectIDs.push(project._id);
            }
          });
          var resultDelete = ProjectsService.remove({ids: projectIDs}, function () {
            if(resultDelete.success){
              $window.location.reload();
            }else{
              self.error = resultDelete.msg;
            }
          });
        }
      };

      this.toggleSelect = function () {
        for(var i=0;i<self.projects.length; i++){
          if(self.projects[i].select){
            self.isShowAdditSection = true;
            return;
          }
        }
        self.selectAll = false;
        self.isShowAdditSection = false;
      };

      this.toggleSelectAll = function () {
        if(self.selectAll){
          self.selectAll = true;
          self.isShowAdditSection = true;
        }else{
          self.selectAll = false;
          self.isShowAdditSection = false;
        }
        angular.forEach(self.projects, function (project) {
          project.select = self.selectAll;
        });
      };

      this.addProject = function () {
        var resultAddProject = ProjectsService.save({name: this.name, description: this.description}, function () {
          if(resultAddProject.success){
            $window.location.reload();
          }else{
            self.errorForm = resultAddProject.msg;
          }
        });
      };

      var resultProjects = ProjectsService.get(function () {
        if(resultProjects.success){
          self.projects = resultProjects.msg;
          if(resultProjects.msg.length > 0){
            self.isShowTable = true;
          }
        }else{
          self.error = resultProjects.msg;
          self.isShowTable = false;
        }
      })
    }]
  });