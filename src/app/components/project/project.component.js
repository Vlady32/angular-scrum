angular.module('components')
  .component('project', {
    templateUrl: 'app/components/project/project.template.html',
    controller: ['$window','$stateParams','SprintsService', 'ProjectsService', 'ItemsService', function ($window,$stateParams,SprintsService,ProjectsService,ItemsService) {
      var self = this;
      this.now = new Date().toJSON().slice(0,10);
      this.chosenSprint = undefined;
      this.item = undefined;
      this.isEdit = false;

      this.setSprintForEdit = function (sprint) {
        self.chosenSprint = sprint;
        self.chosenSprint.finishDate = new Date(sprint.finishDate);
        self.chosenSprint.arrayOptions = [true, false];
      };

      this.editSprint = function () {
        var resultEditingSprint= SprintsService.update({project_id: $stateParams.project_id, sprint_id: this.chosenSprint._id},{name: this.chosenSprint.name, description: this.chosenSprint.description, finishDate: this.chosenSprint.finishDate, isFinished: this.chosenSprint.isFinished}, function () {
          if(resultEditingSprint.success){
            $window.location.reload();
          }else{
            self.errorForm = resultEditingSprint.msg;
          }
        });
      };

      this.removeSprint = function () {
        if($window.confirm('Do you really want to remove this sprint?')) {
          var resultRemovingSprint = SprintsService.remove({
            project_id: $stateParams.project_id,
            sprint_id: this.chosenSprint._id
          }, function () {
            if (resultRemovingSprint.success) {
              $window.location.reload();
            } else {
              self.errorForm = resultRemovingSprint.msg;
            }
          });
        }
      };

      this.addSprint = function () {
        var resultAddingSprint= SprintsService.save({project_id: $stateParams.project_id},{name: this.sprintName, description: this.sprintDescription, finishDate: this.sprintFinishDate}, function () {
          if(resultAddingSprint.success){
            $window.location.reload();
          }else{
            self.errorForm = resultAddingSprint.msg;
          }
        });
      };

      this.redirectToSprint = function (idSprint) {
        $window.location.href = '#!/projects/' + self.project._id + '/sprints/' + idSprint;
      };

      var resultGettingProject = ProjectsService.get({ids: $stateParams.project_id},function () {
        if(resultGettingProject.success){
          self.project = resultGettingProject.msg;
        }else{
          self.error = resultGettingProject.msg;
        }
      });

      this.getSprints = function () {
        var resultGettingSprints = SprintsService.get({project_id: $stateParams.project_id},function () {
          if(resultGettingSprints.success){
            self.sprints = resultGettingSprints.msg;
          }else{
            self.error = resultGettingSprints.msg;
          }
        })
      };

      this.addItem = function () {
        var resultAddingItem = ItemsService.save({project_id: $stateParams.project_id, sprint_id: 'backlog'},{name: this.item.name, description: this.item.description, priority: this.item.priority}, function () {
          if(resultAddingItem.success){
            self.getItemsBacklog();
            self.item = undefined;
            self.isEdit = false;
          }else{
            self.errorFormBacklog = resultAddingItem.msg;
          }
        });
      };

      this.setItemForEdit = function (item) {
        self.item = item;
        self.isEdit = true;
      };

      this.clearItem = function (){
        self.item = undefined;
        self.isEdit = false;
        self.errorFormBacklog = undefined;
      };

      this.editItem = function () {
        var resultEditingItem = ItemsService.update({project_id: $stateParams.project_id, item_id: this.item._id,sprint_id: 'backlog'},{name: this.item.name, description: this.item.description, priority: this.item.priority}, function () {
          if(resultEditingItem.success){
            self.getItemsBacklog();
            self.item = undefined;
            self.isEdit = false;
          }else{
            self.errorFormBacklog = resultEditingItem.msg;
          }
        });
      };

      this.removeItem = function (id) {
        if($window.confirm('Do you really want to remove this item?')) {
          var resultRemovingItem = ItemsService.remove({
            project_id: $stateParams.project_id,
            sprint_id: 'backlog',
            item_id: id
          }, function () {
            if (resultRemovingItem.success) {
              self.getItemsBacklog();
              self.item = undefined;
              self.isEdit = false;
            } else {
              self.errorFormBacklog = resultRemovingItem.msg;
            }
          });
        }else{
          self.isEdit = false;
        }
      };

      this.getItemsBacklog = function (){
        var resultGettingItemsBacklog = ItemsService.get({project_id: $stateParams.project_id, sprint_id: 'backlog'},function () {
          if(resultGettingItemsBacklog.success){
            self.items = resultGettingItemsBacklog.msg;
            self.isEdit = false;
          }else{
            self.error = resultGettingItemsBacklog.msg;
          }
        });
      };

      this.getItemsBacklog();
      this.getSprints();

      $('#modalBacklog').on('hidden.bs.modal', function () {
        self.clearItem();
        self.getItemsBacklog();
      });

    }]
  });