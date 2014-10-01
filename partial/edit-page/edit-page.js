angular.module('bunkerCms').controller('EditPageCtrl', function ($scope, $modalInstance, NodeService, item) {

    $scope.page = item;
    $scope.links = $scope.page.links;

    for (var i = 0; i < $scope.links.length; i++) {
        $scope.links[i].edit = false;
    }

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

    $scope.deleteNode = function () {

        console.log(item._id);
        $modalInstance.dismiss('cancel');
        NodeService.deleteNode(item._id, function () {

            console.log('Deleted?');

        });

    };

    $scope.saveNode = function () {

        $scope.page.links = $scope.links;
        $modalInstance.dismiss('cancel');
        NodeService.saveNode($scope.page, function (res) {


            setTimeout(function () {

                console.log(NodeService.data.tree);

            }, 100);

            //  $rootScope.$apply();


        });

    };

    var selected = {};

    $scope.linkNameEdit = function (evt, link) {

        angular.copy(link, selected);

        evt.stopPropagation();
        link.edit = 'name';

    };

    $scope.linkUrlEdit = function (evt, link) {

        angular.copy(link, selected);

        evt.stopPropagation();
        selected.edit = 'url';
        link.edit = 'url';

    };

    $scope.closeEdit = function (evt, link) {

        selected.edit = false;
        angular.copy(selected, link);

    };

    $scope.addLink = function () {

        selected = {};

        $scope.links.push({
            name: '',
            url: '',
            edit: 'url',
            focus: true,
            new: true
        });

    };

    $scope.deleteLink = function (evt, index) {

        evt.stopPropagation();

        console.log(index);
        $scope.links.splice(index, 1);

    };

    $scope.saveLink = function (evt, link) {

        evt.stopPropagation();

        if (link.new) {
            link.edit = 'name';
            link.new = false;
        } else {
            console.log('click');
            link.edit = false;
        }


    };


});