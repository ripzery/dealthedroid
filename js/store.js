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

app.controller('storeController',function($scope,$location,$http,ngCart){


    $scope.isActive = function (route) {

        return route === $location.path();
    };

    $http.post('../database/is_login.php')
        .success(function(data){
            if(data == 'fail'){
                window.location.href = "../login.php";
            }
        });

    $scope.mobiles = [];
    $scope.loadMobiles = function() {
        return $scope.mobiles.length ? null : $http.get('../database/inventory.php').success(function(data) {
            $scope.mobiles = data;
        });
    };

    ngCart.setTaxRate(7);
    ngCart.setShipping(50);

    $scope.$on('$viewContentLoaded', function() {
        $scope.loadMobiles();
    });

    $scope.logout = function(){
        $http.post('../database/logout.php')
        .success(function(data){
            if(data == "success"){
                window.location.href = "../login.php";
            }
        });
    };

    //
    //$http.post('../database/inventory.php')
    //    .done(function (result) {
    //        $scope.mobiles = result;
    //        $scope.$apply();
    //    });
});

app.controller('cartController', function ($scope, $location, $http) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.logout = function(){
        $http.post('../database/logout.php');
    }
});