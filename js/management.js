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


//$(document).ready(function () {
//
//    //setContent('home');
//    //setInventory();
//
//    $('.navbar li').click(function (e) {
//        e.preventDefault();
//        $(this).tab('show');
//        var index = $(this).index();
//        switch (index) {
//            case 0:
//                setContent('home');
//                //setInventory();
//                break;
//            case 1:
//                setContent('sell');
//                break;
//            case 2:
//                setContent('financial');
//                break;
//        }
//        //alert($(this).index());
//    });
//
//});

function setContent(page) {
    //var url = "../main/" + page + ".html";
    //$.get(url, function (data) {
    //    $(".container-home").html(data);
    //});
    //var url = "<div ng-include=\"\'" + page + ".html\'\"></div>";
    //
    // $(".container-home").html(url);
    // alert($(".container-home").html());
    return page + ".html";

}

function getInventory() {
    $.post('../database/inventory.php')
        .done(function (result) {
            var rawData = JSON.parse(result);
            return rawData;
        });
}