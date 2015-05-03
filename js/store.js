/**
 * Created by visit on 5/3/15 AD.
 */
var app = angular.module('store', ['ngRoute','ngCart']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'main.html',
            controller: 'storeController'
        })
        .when('/cart', {
            templateUrl: 'cart.html',
            controller: 'cartController'
        });
});

app.controller('storeController',function($scope,$location,$http){
    $scope.isActive = function (route) {
        return route === $location.path();
    };
});

app.controller('cartController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});