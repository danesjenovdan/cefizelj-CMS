angular.module('bunkerCms').controller('NewPageCtrl',function($scope, $modalInstance, NodeService, callback, id, items){

    // setup editor options
    // setup editor options
    $scope.editorOptions = {
        language: 'sl',
        uiColor: '#FFFFFF',
        height: 200,
        color: '#fff',
        contentsCss: 'body{background:#222; color:#eee; font-family:Arial}',
        format_tags: 'h3;p',
        toolbar: [
            {
                name: 'Formatting',
                items: ['Format']
            },
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat']
            },
            {
                name: 'paragraph',
                items: ['BulletedList', 'NumberedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight']
            },
            {
                name: 'links',
                items: ['Link', 'Unlink', '-', 'Source']
            },
            '/',
            {
                name: 'clipboard',
                items: ['Cut', 'Copy', 'PasteText', '-', 'Undo', 'Redo']
            }
        ]
    };

    $scope.page = {
        content:'',
        type:'page',
        name:'',
        parentId:id
    };

    $scope.links = [];

    var selected = {};

    $scope.linkNameEdit = function(evt, link){

        angular.copy(link, selected);

        evt.stopPropagation();
        link.edit = 'name';

    };

    $scope.linkUrlEdit = function(evt, link){

        angular.copy(link, selected);

        evt.stopPropagation();
        selected.edit = 'url';
        link.edit = 'url';

    };

    $scope.closeEdit = function(evt, link){

        selected.edit = false;
        angular.copy(selected, link);

    };

    $scope.addLink = function(){

        selected = {};

        $scope.links.push({
            name:'',
            url:'',
            edit:'url',
            focus:true,
            new:true
        });

    };

    $scope.deleteLink = function(evt, index){

        evt.stopPropagation();

        console.log(index);
        $scope.links.splice(index,1);

    };

    $scope.saveLink = function(evt, link){

        evt.stopPropagation();

        if(link.new){
            link.edit = 'name';
            link.new = false;
        }else{
            console.log('click');
            link.edit = false;
        }


    };

    console.log(id);

    console.log($scope.$parent.$parent);


    $scope.createPage = function() {

        $scope.page.links = $scope.links;
        $modalInstance.dismiss('cancel');
        NodeService.createPage($scope.page, function (resItem) {

            //callback();

            items.push(resItem);
            console.log('Saved');

        });

    };

});