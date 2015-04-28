var app = angular.module('management', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'mainController'
        })
        .when('/sell', {
            templateUrl: 'sell.html',
            controller: 'sellController'
        })
        .when('/financial', {
            templateUrl: 'financial.html',
            controller: 'financialController'
        });
});

app.controller('mainController', function ($scope,$location) {


    $scope.isActive = function(route){
        return route === $location.path();
    }
    $.post('../database/inventory.php')
        .done(function (result) {
            var rawData = JSON.parse(result);
            $scope.data = rawData;
            $scope.$apply();
            //alert(rawData);
        });
});
app.controller('sellController', function ($scope,$location) {
    $scope.isActive = function(route){
        return route === $location.path();
    }
});
app.controller('financialController', function ($scope,$location) {
    $scope.isActive = function(route){
        return route === $location.path();
    }
});