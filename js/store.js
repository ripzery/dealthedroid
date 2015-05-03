/**
 * Created by visit on 5/3/15 AD.
 */
var app = angular.module('store', ['ngRoute', 'angularUtils.directives.dirPagination','ngCart']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main.html',
            controller: 'storeController'
        });
});

app.controller('storeController',function($scope,$location,$http){
    $scope.isActive = function (route) {
        return route === $location.path();
    };
});