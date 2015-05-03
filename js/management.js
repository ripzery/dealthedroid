var app = angular.module('management', ['ngRoute', 'angularUtils.directives.dirPagination','xeditable']);

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

app.run(function(editableOptions){
    editableOptions.theme = 'bs3';
})

app.controller('stockController', function ($scope, $location, $http, $filter) {
    $scope.duplicateModel = false;
    $scope.duplicateBrand = false;
    $scope.currentPage = 1;
    $scope.pageSize = 6;
    //$scope.brandPageSize = 3;
    //$scope.currentBrandPage = 1;
    //$scope.brandidrule = "mobileForm.brandid.$invalid && mobileForm.brandid.$dirty";
    $scope.brandrule = "brandForm.brand.$invalid && brandForm.brand.$dirty || duplicateBrand";
    $scope.modelrule = "mobileForm.model.$invalid && mobileForm.model.$dirty || duplicateModel";
    $scope.pricerule = "mobileForm.price.$invalid && mobileForm.price.$dirty ";
    $scope.quantityrule = "mobileForm.quantity.$invalid && mobileForm.quantity.$dirty";

    $scope.brands = [];

    $scope.loadBrands = function() {
        return $scope.brands.length ? null : $http.get('../database/get_brand.php').success(function(data) {
            $scope.brands = data;
        });
    };


    $scope.$on('$viewContentLoaded', function() {
        $scope.loadBrands();
    });


    $scope.submitmobileForm = function (isValid) {
        if (isValid) {

            $http.post('../database/add_mobile.php', {
                brandid: $scope.selectedItem,
                model: $scope.model,
                price: $scope.price,
                quantity: $scope.quantity
            }).success(function (data, status, headers, config) {
                if (data) {
                    $scope.duplicateModel = false;
                    $scope.mobiles.push(data[0]);
                }
                else {
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
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    // Don't delete this because it's tricky way to update data.
    $scope.updateBrand = function(data){

    };

    $scope.showBrand = function(mobile) {
        //alert(mobile.brand.name);
        if(mobile.brand_id && $scope.brands.length) {
            var selected = $filter('filter')($scope.brands, {id: mobile.brand_id});
            //$scope.selectedBrand = selected;
            return selected.length ? selected[0].name : 'Not set';
        } else {
            return mobile.brand.name || 'Not set';
        }
    };

    // Don't delete this because it's tricky way to update data.
    $scope.checkName = function(data, mobile) {
        //if (id === 2 && data !== 'awesome') {
        //    return "Username 2 should be `awesome`";
        //}
    };

    // Edit and save mobile
    $scope.saveMobile = function(data,mobileid) {
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
            .success(function(data,status,headers,config){
                alert(data);
            });
    };

    // remove user
    $scope.removeMobile = function(index) {
        $http.post('../database/remove_mobile.php',{
            id: $scope.mobiles[index].id
        })
            .success(function(data,status,headers,config){
                alert(data);
            });

        $scope.mobiles.splice(index, 1);


    };



    $.post('../database/inventory.php')
        .done(function (result) {
            var rawData = JSON.parse(result);
            $scope.mobiles = rawData;
            $scope.$apply();
            //alert(rawData);
        });
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