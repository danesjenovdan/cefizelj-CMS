

angular.module('bunkerCms').controller('LoginCtrl',function($scope, $rootScope, $location, $http){

    $scope.login = {};

    // Register the login() function
    $scope.login = function(){

        console.log($scope.login.email, $scope.login.password);

        $http.post('http://cefizeljapi.djnd.si'+'/login', {
            username: $scope.login.email,
            password: $scope.login.password
        })
            .success(function(user){
                // No error: authentication OK
                $rootScope.message = 'Authentication successful!';
                $rootScope.user = user;
                $location.url('/browser');
            })
            .error(function(){
                // Error: authentication failed
                $rootScope.message = 'Authentication failed.';
                //$location.url('/login');
            });
    };

});