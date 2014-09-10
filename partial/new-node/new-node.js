angular.module('bunkerCms').controller('NewNodeCtrl',function($scope, $modalInstance, NodeService, Restangular, id, callback, items){

    console.log($scope.$parent.$parent);

    $scope.items = items;

    $scope.menu = {
        parentId:id,
        type:'menu'
    };

    console.log(id);

    $scope.createMenu = function() {
        $modalInstance.dismiss('cancel');
        NodeService.createMenu($scope.menu, function (resItem) {

            console.log(resItem);
            items.push(resItem);
            //callback();
            console.log('Saved');

        });

    };


});