angular.module('bunkerCms').controller('EditMenuCtrl',function($scope, $modalInstance, $rootScope, item, NodeService){


    $scope.item = {};

    angular.copy(item, $scope.item);

    $scope.deleteNode = function(){
        $modalInstance.dismiss('cancel');
        console.log(item._id);

        NodeService.deleteNode(item._id, function(){

            console.log('Deleted?');

        });

    };

    $scope.saveNode = function(){
        $modalInstance.dismiss('cancel');
        NodeService.saveNode($scope.item,function(res){


            setTimeout(function(){

                console.log(NodeService.data.tree);

            },100);

            //  $rootScope.$apply();


        });

    };

});