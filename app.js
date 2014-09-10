angular.module('bunkerCms', [
    'ui.bootstrap',
    'ui.utils',
    'ui.router',
    'ui.sortable',
    'ngAnimate',
    'restangular',
    'ui.select2',
    'chieffancypants.loadingBar',
    'blockUI',
    'ngCkeditor'
]);



angular.module('bunkerCms').config(function($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, blockUIConfigProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    RestangularProvider.setBaseUrl('http://cefizeljapi.djnd.si');

    RestangularProvider.setDefaultHttpFields({withCredentials: true});

    blockUIConfigProvider.message('just a sec...');

    /**
     * Add an interceptor for AJAX errors
     */
    $httpProvider.responseInterceptors.push(function($q, $location) {
        return function(promise) {
            return promise.then(
                // Success: just return the response
                function(response){
                    return response;
                },
                // Error: check the error status to get only the 401
                function(response) {
                    if (response.status === 401){
                        $location.url('/login');
                    }
                    return $q.reject(response);

                }
            );
        };
    });

    /**
     * Is user logged in
     * @param $q
     * @param $timeout
     * @param $http
     * @param $location
     * @param $rootScope
     * @returns {*|Function|Function|Function|Function|promise|promise|promise|promise|Promise._progressUnchecked.promise|promise|Promise._progressUnchecked.promise|promise|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|promise|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|Function|promise|Function|Function|promise|Function|PromiseResolver.promise|PromiseResolver.promise|promise|promise|PromiseResolver.promise|PromiseResolver.promise|exports.exports.Reduction.promise|exports.exports.Reduction.promise|exports.exports.Mapping.promise|Mapping.promise|exports.exports.Mapping.promise|Mapping.promise|Promise.promise|Function|promise|Q.promise|Function|Function|Function|Function|Function|Function|Function|Function}
     */
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();
        // Make an AJAX call to check if the user is logged in
        $http.get('http://cefizeljapi.djnd.si'+'/login-status').success(function(user){
            // Authenticated
            console.log(user);
            if (user !== '0'){
                $rootScope.user = user;
                $rootScope.loggedIn = true;
                $timeout(deferred.resolve, 0);
            }

            // Not Authenticated
            else {
                $rootScope.loggedIn = false;
                $rootScope.message = 'You need to log in.';
                $timeout(function(){deferred.reject();}, 0);
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

    $stateProvider.state('browser', {
        url: '/browser',
        templateUrl: 'partial/browser/browser.html',
        controller:'BrowserCtrl',
        resolve:{
            loggedIn:checkLoggedin,
            nodes:function(NodeService){
                return NodeService.getTree();
            }
        }
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html',
        controller:'LoginCtrl'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/browser');

});

angular.module('bunkerCms').run(function($rootScope) {

    $rootScope.baseUrl = 'http://cefizeljapi.djnd.si';

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
