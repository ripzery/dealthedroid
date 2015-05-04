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
        })
        .when('/history', {
            templateUrl: 'history.html',
            controller: 'historyController'
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
            }else{
                $scope.username = data;
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
                ngCart.empty(true);
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

app.controller('cartController', function ($scope, $location, $http,ngCart) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.update = "";

    $scope.cancel = function(){
        ngCart.empty(true);
        //$location.path("/store");
    };

    $scope.isCartEmpty = function(){
        return ngCart.totalCost() != 0;
    };

    $scope.confirm = function(){
        var items = ngCart.getItems();
        console.log(items);
        $http.post('../database/update_stock.php',[
            items
        ]).success(function(data){
            console.log(data);
            if(data == "success"){
                ngCart.empty(true);
                $scope.update = "Congratulation, you will get your product soon!";
            }else if(data == "fail"){

            }
        });
    };

    $scope.logout = function(){
        $http.post('../database/logout.php')
            .success(function(data){
                if(data == "success"){
                    ngCart.empty(true);
                    window.location.href = "../login.php";
                }
            });
    };
});

app.controller('historyController', function ($scope, $location, $http, ngCart) {
    $scope.user = [];
    $scope.transactions = [];

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.getTransactions();
    });

    $scope.getTransactions = function(){
        return $scope.transactions.length ? null : $http.post('../database/get_transactions.php').success(function(data){ $scope.transactions = data; });
    };

    $scope.getRecords = function(){
        //alert($scope.selectedTransaction);
        $http.post('../database/get_records.php', {
            tid: $scope.selectedTransaction
        }).success(function(data){
            $scope.records = data;
        });
    };

    $scope.logout = function(){
        $http.post('../database/logout.php')
            .success(function(data){
                if(data == "success"){
                    ngCart.empty(true);
                    window.location.href = "../login.php";
                }
            });
    };
});