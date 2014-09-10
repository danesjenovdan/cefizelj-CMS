angular.module('bunkerCms').directive('level', function ($compile) {
    return function (scope, element, attrs) {
        //console.log(element[0]);

        setTimeout(function(){

            $(element[0]).css('top',69);

        },0);

    };
});

angular.module('bunkerCms').controller('BrowserCtrl',function($scope, $modal, nodes, NodeService){

    console.log('Nodes');
    console.log(nodes);


    var currentItem;
    var currentScope;

    $scope.data = NodeService.data;
    $scope.nodes = $scope.data.raw;
    $scope.rootId = $scope.data.raw.rootId;
    $scope.list = $scope.data.tree;
    $scope.item = {};
    $scope.empty = false;
    $scope.currentNode = {};

    console.log($scope.list);

    if($scope.nodes.tree.length === 0){
        $scope.empty = true;
        $scope.item.parentId = $scope.rootId;
    }

    $scope.nodeClick = function(item, scope){

        $scope.currentNode = item;

        visibleItems = [];

        selectLoop(scope);
        hideLoop($scope.list);

    };

    var visibleItems = [];

    function selectLoop(scope){


        if(scope.item) {

            scope.item.visible = true;
            visibleItems.push(scope.item);

        }

        if(scope.$parent){

            selectLoop(scope.$parent);

        }

    }

    function hideLoop(list){

        if(list) {
            for (var i = 0; i < list.length; i++) {

                var item = list[i];
                var hide = true;
                for(var j=0;j<visibleItems.length;j++){
                    var vItem = visibleItems[j];
                    if(vItem === item){
                        hide =  false;
                    }
                }
                if(hide) {
                    item.visible = false;
                }
                hideLoop(item.items);
            }
        }
    }


    function refresh(){

        console.log('Refresh');

        $scope.list = NodeService.data.tree;
        //$scope.$apply();

        if($scope.nodes.tree.length === 0){
            $scope.empty = true;
            $scope.item.parentId = $scope.rootId;
        }else{
            $scope.empty = false;
        }

        if(currentScope) {
           // hideLoop(currentScope.list);
           // selectLoop(currentScope);
        }
    }

    /**
     * SORTABLE OPTIONS
     */
    $scope.sortableOptions = {
        update: function(e, ui) {
            if (ui.item.scope().item === "can't be moved") {
                ui.item.sortable.cancel();
            }

            var id = ui.item.attr('id');
            var sortArray = [];

            NodeService.findInTree(id,function(item, array){

                console.log(array);

                setTimeout(function(){

                    for(var i=0;i<array.length;i++){

                        console.log(array[i].name);

                        sortArray.push({
                            _id:array[i]._id,
                            sortOrder:i+1
                        });

                    }

                    NodeService.sortNodes(sortArray);

                }, 0);

            });

        },
        placeholder: "sortable-placeholder",
        start:function(e, ui){

            console.log(ui.placeholder[0]);

            ui.placeholder.css({
                backgroundColor:'#999'
            });

            ui.item.css({
                transform:'rotate(-3deg)'
            });

        },
        stop:function(e, ui){
            ui.item.css({
                transform:'rotate(0deg)'
            });
        }

    };

    $scope.newMenu = function(id, item, scope, group, root){

        currentItem = item;
        currentScope = scope;

        console.log(item);
        var items;
        if(item.items && !root) {
            items = item.items;

            if (!item.items) {
                item.items = [];
                items = item.items;
            }


            if(group === true){
                console.log('GROUP');
                console.log(scope.$parent);
                console.log(scope.$parent.$parent.$parent);
                items = scope.$parent.$parent.$parent.item.items;


                if(scope.$parent.$parent.$parent.list && !scope.$parent.$parent.$parent.item.items){
                    items = scope.$parent.$parent.$parent.list;
                }
            }

        }else{
            id = $scope.rootId;
            items = nodes.tree;
        }


        console.log(id);
        console.log(scope);

        $modal.open({
            templateUrl:'partial/new-node/new-node.html',
            controller:'NewNodeCtrl',
            resolve:{
                items:function(){

                    return items;

                },
                id:function(){
                    return id;
                },
                callback:function(){
                    return refresh;
                }
            }
        }).result.then(function(result){
                console.log(result);
            });

    };

    $scope.levelCreated = function(elem){

        console.log(elem);

    };

    $scope.deleteNode = function(item){

        NodeService.deleteNode(item._id, function(res){

            NodeService.getTree(function(res){

                $scope.list = NodeService.data.tree;
                //$scope.$apply();

            });

        });

    };

    $scope.editNode = function(event, item, list){

        event.stopPropagation();

        console.log(list);

        var type = item.type;

        console.log(type);

        if(type === 'page') {

            $modal.open({
                templateUrl: 'partial/edit-page/edit-page.html',
                controller: 'EditPageCtrl',
                windowClass: 'page-modal-window',
                resolve: {
                    item: function () {

                        return item;
                    }
                }
            }).result.then(function (result) {

                });

        }else{
            $modal.open({
                templateUrl: 'partial/edit-menu/edit-menu.html',
                controller: 'EditMenuCtrl',

                resolve: {
                    item: function () {

                        return item;

                    }
                }
            }).result.then(function (result) {

                });
        }

    };

    $scope.newPage = function(id, item, scope, group, root){

        currentItem = item;
        currentScope = scope;

        var items;

        if(item.items && !root) {
            items = item.items;

            if (!item.items) {
                item.items = [];
                items = item.items;
            }


            if(group === true){
                console.log('GROUP');
                console.log(scope.$parent);
                console.log(scope.$parent.$parent.$parent);
                items = scope.$parent.$parent.$parent.item.items;


                if(scope.$parent.$parent.$parent.list && !scope.$parent.$parent.$parent.item.items){
                    items = scope.$parent.$parent.$parent.list;
                }
            }

        }else{
            id = $scope.rootId;
            items = nodes.tree;
        }

        $modal.open({
            templateUrl:'partial/new-page/new-page.html',
            controller:'NewPageCtrl',
            windowClass: 'page-modal-window',
            resolve:{
                items:function(){

                    return items;

                },
            id:function(){
                return id;
            },
            callback:function(){
                return refresh;
            }
        }
        }).result.then(function(result){

            });

    };

});