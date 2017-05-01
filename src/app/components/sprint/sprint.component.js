angular.module('components')
  .component('sprintScrum', {
    templateUrl: 'app/components/sprint/sprint.template.html',
    controller: ['$window','$stateParams','SprintsService','ItemsService', function ($window, $stateParams, SprintsService,ItemsService) {
      var self = this;

      var resultGettingSprint = SprintsService.get({project_id: $stateParams.project_id, sprint_id: $stateParams.sprint_id},function () {
        if(resultGettingSprint.success){
          self.sprint = resultGettingSprint.msg;
        }else{
          self.error = resultGettingSprint.msg;
        }
      });

      this.getItems = function (){
        var resultGettingItems = ItemsService.get({project_id: $stateParams.project_id, sprint_id:$stateParams.sprint_id},function () {
          if(resultGettingItems.success){
            self.items = resultGettingItems.msg;
          }else{
            self.error = resultGettingItems.msg;
          }
        });
      };

      this.editItem = function (item) {
        var resultEditingItem = ItemsService.update(
          {
            project_id: $stateParams.project_id,
            item_id: item._id,
            sprint_id: item.sprint_id
          },
          {
            name: item.name,
            description: item.description,
            priority: item.priority,
            isBacklog: item.isBacklog,
            status: item.status,
            storyPoints: item.storyPoints
          }, function () {
          if(resultEditingItem.success){
            self.getItems();
          }else{
            self.error = resultEditingItem.msg;
          }
        });
      };

      this.editChosenItem = function () {
        var isBacklog = (this.chosenItem.status == 0);
        var resultEditingItem = ItemsService.update(
          {
            project_id: $stateParams.project_id,
            item_id: this.chosenItem._id,
            sprint_id: isBacklog ? 'backlog' : $stateParams.sprint_id
          },
          {
            name: this.chosenItem.name,
            description: this.chosenItem.description,
            priority: this.chosenItem.priority,
            isBacklog: isBacklog,
            status: this.chosenItem.status,
            storyPoints: this.chosenItem.storyPoints
          }, function () {
            if(resultEditingItem.success){
              self.getItems();
              $window.location.reload();
            }else{
              self.error = resultEditingItem.msg;
            }
          });
      };

      this.addItem = function () {
        var isBacklog = this.item.stage == 0 || this.item.stage === undefined;
        var resultAddingItem = ItemsService.save(
          {
            project_id: $stateParams.project_id,
            sprint_id: isBacklog ? 'backlog' : $stateParams.sprint_id
          },
          {
            name: this.item.name,
            description: this.item.description,
            priority: this.item.priority,
            isBacklog: !!isBacklog,
            status: this.item.stage,
            storyPoints: this.item.storyPoints
          }, function () {

          if(resultAddingItem.success){
            self.getItems();
            self.item = undefined;
            $window.location.reload();
          }else{
            self.errorFormAdd = resultAddingItem.msg;
          }
        });
      };

      this.removeItem = function (id) {
        if($window.confirm('Do you really want to remove this item?')) {
          var resultRemovingItem = ItemsService.remove({
            project_id: $stateParams.project_id,
            item_id: id,
            sprint_id: $stateParams.sprint_id
          }, function () {
            if (resultRemovingItem.success) {
              self.getItems();
            } else {
              self.error = resultRemovingItem.msg;
            }
          });
        }
      };

      this.getItems();

      this.onDropToDo = function($data){
        if($data.isBacklog == true){
          $data.isBacklog = false;
        }
        $data.status = 1;
        $data.sprint_id = $stateParams.sprint_id;
        this.editItem($data);
      };

      this.onDropToDoing = function($data){
        if($data.isBacklog == true){
          $data.isBacklog = false;
        }
        $data.status = 2;
        $data.sprint_id = $stateParams.sprint_id;
        this.editItem($data);
      };

      this.onDropToDone = function($data){
        if($data.isBacklog == true){
          $data.isBacklog = false;
        }
        $data.status = 3;
        $data.sprint_id = $stateParams.sprint_id;
        this.editItem($data);
      };

      this.onDropBacklog = function($data){
        $data.isBacklog = true;
        $data.sprint_id = 'backlog';
        $data.status = 0;
        this.editItem($data);
      };

      $('#modalEditItem').on('hidden.bs.modal', function () {
        self.getItems();
      });

      this.setItem = function (item) {
        this.chosenItem = item;
        switch (item.status){
          case 0:
            break;
          case 1:
            this.chosenItem.statusItem = 'to do';
            break;
          case 2:
            this.chosenItem.statusItem = 'doing';
            break;
          case 3:
            this.chosenItem.statusItem = 'done';
            break;
        }

        if(item.isBacklog){
          this.chosenItem.statusItem = 'Backlog';
        }

        switch (item.priority){
          case 1:
            this.chosenItem.priorityItem = 'low';
            break;
          case 2:
            this.chosenItem.priorityItem = 'middle';
            break;
          case 3:
            this.chosenItem.priorityItem = 'high';
            break;
        }

      };

    }]
  });
