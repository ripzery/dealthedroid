/**
 * Created by visit on 5/3/15 AD.
 */
var app = angular.module('store', ['ngRoute','ngCart']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/store', {
            templateUrl: 'store.html',
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

    $scope.mobiles = [];
    $scope.loadMobiles = function() {
        return $scope.mobiles.length ? null : $http.get('../database/inventory.php').success(function(data) {
            $scope.mobiles = data;
        });
    };

    $scope.$on('$viewContentLoaded', function() {
        $scope.loadMobiles();
    });
    //
    //$http.post('../database/inventory.php')
    //    .done(function (result) {
    //        $scope.mobiles = result;
    //        $scope.$apply();
    //    });
});

app.controller('cartController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});