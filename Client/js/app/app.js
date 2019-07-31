var recordApp = angular.module('recordApp', ['ngRoute']);
recordApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
// recordApp.constant('apiUrl','http://192.168.0.13:9090/TLGApp')
recordApp.constant('apiUrl','http://127.0.0.1:5000')
recordApp.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/record', {
        templateUrl : 'pages/record/record.html',
        controller  : 'recordController'
    })
    .otherwise({
       redirectTo: '/record'
   });
});
