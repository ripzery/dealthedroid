/**
 * Created by visit on 5/3/15 AD.
 */
var app = angular.module('store', ['ngRoute', 'ngCart']);

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

app.controller('storeController', function ($scope, $location, $http, ngCart) {

    $scope.isActive = function (route) {

        return route === $location.path();
    };

    $http.post('../database/is_login.php')
        .success(function (data) {
            if (data == 'fail') {
                window.location.href = "../#/login";
            } else {
                $scope.username = data;
            }
        });

    $scope.brands = [];

    $scope.getSelectedBrand = function () {
        $scope.mobiles = [];
        if($scope.br != 0) {
            for (var m = 0; m < $scope.allMobiles.length; m++) {
                console.log($scope.allMobiles[m].brand_id);
                if ($scope.allMobiles[m].brand_id == $scope.br) {
                    $scope.mobiles.push($scope.allMobiles[m]);

                }
            }
        }else{
            $scope.mobiles = $scope.allMobiles;
        }
    };

    $scope.current_currency = "THB ";

    $scope.currency = ["TH-baht", "US-dollars"];
    $scope.cur = "TH-baht";
    $scope.getCurrency = function () {
        // Get web services currency converter
        console.log("Sending : " + $scope.cur);
        $http.post('../database/get_currency.php',{
            currency: $scope.cur
        }).success(function(result){
            //alert(result);
            if($scope.cur == "Th-baht"){
                $scope.current_currency = "THB ";
            }else{
                $scope.current_currency = "$";
            }
            for(var m = 0 ; m < $scope.mobiles.length; m++){
                $scope.mobiles[m].price *= result;
            }

        });
    };

    $scope.mobiles = [];
    $scope.loadMobiles = function () {
        return $scope.mobiles.length ? null : $http.get('../database/inventory.php').success(function (data) {
            $scope.mobiles = data;
            $scope.allMobiles = data;
            $scope.brands = [];
            $scope.brandIndex = [];
            var all = {id:"0",name:"All"};
            $scope.br = "0";
            $scope.brands.push(all);
            for (var b = 0; b < $scope.allMobiles.length; b++) {
                //console.log($scope.allMobiles[b].brand.id);

                if ($scope.brandIndex.indexOf($scope.allMobiles[b].brand_id) == -1) {
                    $scope.brandIndex.push($scope.allMobiles[b].brand_id);
                    $scope.brands.push($scope.allMobiles[b].brand);
                }
            }
        });
    };

    ngCart.setTaxRate(7);
    ngCart.setShipping(50);

    $scope.$on('$viewContentLoaded', function () {
        if($scope.mobiles.length == 0)
            $scope.loadMobiles();
    });

    $scope.logout = function () {
        $http.post('../database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    ngCart.empty(true);
                    window.location.href = "../#/login";
                }
            });
    };

    $scope.genPdf = function () {
        var doc = new jsPDF();
        var source = document.getElementById('table-records');
        //console.log(source.innerHTML);
        var specialElementHandlers = {
            '#textlead': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(
            source, // [Refer Exact code tutorial][2]HTML string or DOM elem ref.
            15,    // x coord
            15,    // y coord
            {
                'width': 522, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            });
        doc.output('dataurl');
    };

});

app.controller('cartController', function ($scope, $location, $http, ngCart) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.update = "";

    $scope.cancel = function () {
        ngCart.empty(true);
        //$location.path("/store");
    };

    $scope.isCartEmpty = function () {
        return ngCart.totalCost() != 0;
    };

    $scope.confirm = function () {
        var items = ngCart.getItems();
        var tax = ngCart.getTax();
        var shipping = ngCart.getShipping();
        var total_price = ngCart.totalCost();
        console.log(items);
        $http.post('../database/update_stock.php', {
            items: items,
            tax: tax,
            shipping: shipping,
            total_price: total_price
        }).success(function (data) {
            console.log(data);
            if (data == "success") {
                ngCart.empty(true);
                $scope.update = "Congratulation, you will get your product soon!";
            } else if (data == "fail") {

            }
        });
    };

    $scope.logout = function () {
        $http.post('../database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    ngCart.empty(true);
                    window.location.href = "../#/login";
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

    $scope.getTransactions = function () {
        return $scope.transactions.length ? null : $http.post('../database/get_transactions.php').success(function (data) {
            $scope.transactions = data;
            $scope.selectedTransaction = $scope.transactions[$scope.transactions.length-1].id;
            $scope.getRecords();
        });
    };

    $scope.getRecords = function () {
        //alert($scope.selectedTransaction);
        $http.post('../database/get_records.php', {
            tid: $scope.selectedTransaction
        }).success(function (data) {
            $scope.records = data;

        });
    };

    $scope.logout = function () {
        $http.post('../database/logout.php')
            .success(function (data) {
                if (data == "success") {
                    ngCart.empty(true);
                    window.location.href = "../#/login";
                }
            });
    };
});