// define module name and load some external libraries module
var app = angular.module('management', ['ngRoute', 'angularUtils.directives.dirPagination', 'xeditable']);

// define route for each view and set controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/stock', {
            templateUrl: 'home.html',
            controller: 'stockController'
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

// set theme for x-editable
app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

// controller for stock view
app.controller('stockController', function ($scope, $location, $http, $filter, $timeout) {
    $scope.duplicateModel = false;
    $scope.duplicateBrand = false;
    $scope.showMessage = false;
    $scope.currentPage = 1;
    $scope.pageSize = 4;
    $scope.message = "Save successfully.";
    //$scope.brandPageSize = 3;
    //$scope.currentBrandPage = 1;
    //$scope.brandidrule = "mobileForm.brandid.$invalid && mobileForm.brandid.$dirty";

    // define rule that permit form submitted if the value is match the rule
    $scope.brandrule = "brandForm.brand.$invalid && brandForm.brand.$dirty || duplicateBrand";
    $scope.modelrule = "mobileForm.model.$invalid && mobileForm.model.$dirty || duplicateModel";
    $scope.pricerule = "mobileForm.price.$invalid && mobileForm.price.$dirty ";
    $scope.quantityrule = "mobileForm.quantity.$invalid && mobileForm.quantity.$dirty";

    // init brands array that will inject to select options
    $scope.brands = [];


    // check if user is logged in now
    $http.post('../database/is_login.php')
        .success(function (data) {
            if (data == "fail") {
                window.location.href = "../#/login";
            } else {
                $scope.username = data;
                if ($scope.username != "admin")
                    window.location.href = "../#/login";
            }
        });


    // send ajax request to load all brands in the database
    $scope.loadBrands = function () {
        return $scope.brands.length ? null : $http.get('../database/get_brand.php').success(function (data) {
            $scope.brands = data;
        });
    };


    // when content is loaded complete, then load all brands from database.
    $scope.$on('$viewContentLoaded', function () {
        $scope.loadBrands();
    });


    // send ajax request to add mobile to the database
    $scope.submitmobileForm = function (isValid) {
        if (isValid) {

            $http.post('../database/add_mobile.php', {
                brandid: $scope.selectedItem,
                model: $scope.model,
                price: $scope.price,
                quantity: $scope.quantity,
                description: $scope.description
            }).success(function (data, status, headers, config) {
                if (data) {

                    $scope.showMessage = true;
                    $timeout(function () {
                        $scope.showMessage = false;
                    }, 3000);
                    $scope.duplicateModel = false;
                    $scope.mobiles.push(data[0]);
                }
                else {
                    $scope.duplicateModel = true;
                }

            });
        }
    };

    // send ajax request to submit brand form
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
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    // Don't delete this because it's tricky way to update data.
    $scope.updateBrand = function (data) {

    };

    // filter brands before show
    $scope.showBrand = function (mobile) {
        //alert(mobile.brand.name);
        if (mobile.brand_id && $scope.brands.length) {
            var selected = $filter('filter')($scope.brands, {id: mobile.brand_id});
            //$scope.selectedBrand = selected;
            return selected.length ? selected[0].name : 'Not set';
        } else {
            return mobile.brand.name || 'Not set';
        }
    };

    // Don't delete this because it's tricky way to update data.
    $scope.checkName = function (data, mobile) {
        //if (id === 2 && data !== 'awesome') {
        //    return "Username 2 should be `awesome`";
        //}
    };

    // Edit and save mobile
    $scope.saveMobile = function (data, mobileid) {
        //$scope.user not updated yet
        angular.extend(data, {id: mobileid});
        //
        $http.post('../database/edit_mobile.php', {
            id: data.id,
            brandid: data.brand_id,
            model: data.model,
            price: data.price,
            quantity: data.quantity
        })
            .success(function (data, status, headers, config) {
                alert(data);
            });
    };

    // remove user
    $scope.removeMobile = function (index) {
        $http.post('../database/remove_mobile.php', {
            id: $scope.mobiles[index].id
        })
            .success(function (data, status, headers, config) {
                alert(data);
            });

        $scope.mobiles.splice(index, 1);


    };

    // send ajax request to get all mobiles data
    $.post('../database/inventory.php')
        .done(function (result) {
            var rawData = JSON.parse(result);
            $scope.mobiles = rawData;
            $scope.$apply();
        });

    // logging out and redirect to login page
    $scope.logout = function () {
        $http.post('../database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    window.location.href = "../#/login";
                }
            });
    };
});
//app.controller('sellController', function ($scope, $location) {
//    $scope.isActive = function (route) {
//        return route === $location.path();
//    };
//
//    // logging out and redirect to login page
//    $http.post('../database/logout.php')
//        .success(function(data){
//            if(data == "success"){
//                window.location.href = "../#/login";
//            }
//        });
//});
//app.controller('financialController', function ($scope, $location) {
//    $scope.isActive = function (route) {
//        return route === $location.path();
//    };
//
//    // logging out and redirect to login page
//    $http.post('../database/logout.php')
//        .success(function(data){
//            if(data == "success"){
//                window.location.href = "../#/login";
//            }
//        });
//});