var app = angular.module('management', ['ngRoute', 'angularUtils.directives.dirPagination']);

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

app.controller('mainController', function ($scope, $location, $http) {
    $scope.duplicateModel = false;
    $scope.duplicateBrand = false;
    $scope.currentPage = 1;
    $scope.pageSize = 30;
    //$scope.brandPageSize = 3;
    //$scope.currentBrandPage = 1;
    //$scope.brandidrule = "mobileForm.brandid.$invalid && mobileForm.brandid.$dirty";
    $scope.brandrule = "brandForm.brand.$invalid && brandForm.brand.$dirty || duplicateBrand";
    $scope.modelrule = "mobileForm.model.$invalid && mobileForm.model.$dirty || duplicateModel";
    $scope.pricerule = "mobileForm.price.$invalid && mobileForm.price.$dirty ";
    $scope.quantityrule = "mobileForm.quantity.$invalid && mobileForm.quantity.$dirty";

    $scope.submitmobileForm = function (isValid) {
        if (isValid) {
            //$.post('../database/add_mobile.php', {
            //    brandid: $scope.brandid,
            //    model: $scope.model,
            //    price: $scope.price,
            //    quantity: $scope.quantity
            //
            //}).done(function (isSuccess){
            //    if(isSuccess){
            //        alert(isSuccess);
            //        $scope.data = isSuccess;
            //        $scope.$apply();
            //    }
            //});

            $http.post('../database/add_mobile.php', {
                brandid: $scope.selectedItem,
                model: $scope.model,
                price: $scope.price,
                quantity: $scope.quantity
            }).success(function (data, status, headers, config) {
                if (data) {
                    $scope.duplicateModel = false;
                    $scope.data.push(data[0]);
                }
                else {
                    //alert(data);
                    $scope.duplicateModel = true;
                }

            });
        }
    };

    $scope.submitbrandForm = function (isValid) {
        $http.post('../database/add_brand.php', {
            name: $scope.brand
        }).success(function (data, status, headers, config) {
            if (data) {
                $scope.duplicateBrand = false;
                $scope.brands.push(data);
            } else {
                $scope.duplicateBrand = true;
            }

        });
    }
    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $.post('../database/inventory.php')
        .done(function (result) {
            var rawData = JSON.parse(result);
            $scope.data = rawData;
            $scope.$apply();
            //alert(rawData);
        });
    $.post('../database/get_brand.php')
        .done(function (data) {
            //alert(data);
            var b = JSON.parse(data);
            $scope.brands = b;
            $scope.$apply();
        });

    //$('#myModal').on('shown.bs.modal', function() {
    //    $("#brand").focus();
    //    $.post('../database/get_brand.php')
    //        .done(function (data){
    //            //alert(data);
    //            var b = JSON.parse(data);
    //            $scope.brands = b;
    //            //alert(b);
    //            $scope.$apply();
    //            //alert($scope.brands);
    //        });
    //});

    var exportTable = function(){

    }
});
app.controller('sellController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});
app.controller('financialController', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

//app.directive('uniqueModel', ['$http', function($http) {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function(scope, element, attrs, ctrl) {
//            //set the initial value as soon as the input comes into focus
//            element.on('focus', function() {
//                if (!scope.initialValue) {
//                    scope.initialValue = ctrl.$viewValue;
//                }
//            });
//            element.on('blur', function() {
//                if (ctrl.$viewValue != scope.initialValue) {
//                    //var dataUrl = attrs.url + "?email=" + ctrl.$viewValue;
//                    //you could also inject and use your 'Factory' to make call
//                    $http.post('../database/add_mobile_check_duplicate.php',{
//                        model: ctrl.$viewValue
//                    }).success(function(data) {
//                        ctrl.$setValidity('isunique', data.result);
//                    }).error(function(data, status) {
//                        //handle server error
//                    });
//                }
//            });
//        }
//    };
//}]);