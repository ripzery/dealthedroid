/**
 * Created by visit on 5/3/15 AD.
 */
var app = angular.module('store', ['ngRoute', 'ngCart']);


//Define route and controller in store,cart,history page
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

// Define controller for store page
app.controller('storeController', function ($scope, $location, $http, ngCart, $rootScope) {

    // check if this page is active
    $scope.isActive = function (route) {

        return route === $location.path();
    };

    $scope.itemCost = ngCart.totalCost();

    // send ajax to check session if this user is currectly login
    $http.post('../database/is_login.php')
        .success(function (data) {
            if (data == 'fail') {
                window.location.href = "../#/login";
            } else {
                $scope.username = data;
            }
        });

    $rootScope.$on('ngCart:change', function(){
        $scope.itemCost = ngCart.totalCost();
    });

    // initialize brands array
    $scope.brands = [];

    // get all mobiles in selected brand
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

    // set default currency to "THB"
    $scope.current_currency = "THB";
    if(ngCart.getItems().length != 0){
        ngCart.getItems()[0].setData($scope.current_currency);
    }

    // set selectable option for currency
    $scope.currency = ["TH-baht", "US-dollars"];

    // set current currnecy to "THB
    $scope.cur = "TH-baht";

    // send ajax request to get result of currency converter
    $scope.getCurrency = function () {
        // Get web services currency converter
        console.log("Sending : " + $scope.cur);
        $http.post('../database/get_currency.php',{
            currency: $scope.cur
        }).success(function(result){
            if($scope.cur == "TH-baht"){
                $scope.current_currency = "THB";
            }else{
                $scope.current_currency = "$";
            }
            ngCart.getItems()[0].setData($scope.current_currency);
            cartItems = ngCart.getItems();
            for(var m = 0 ; m < cartItems.length; m++){
                cartItems[m].setPrice(cartItems[m].getPrice()*result);
            }

            for(var m = 0 ; m < $scope.mobiles.length; m++){
                $scope.mobiles[m].price *= result;
            }

        });
    };

    // initialize mobiles array to show all available mobiles
    $scope.mobiles = [];

    // get all mobiles in database and set brands array which available now
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

    // set tax rate 7%
    ngCart.setTaxRate(7);

    // set shipping price 50
    ngCart.setShipping(50);

    //ngCart.getItems()[0].getData();
    $scope.$on('change', function(event, mass) {
        console.log(mass)
    });

    // when content has been loaded then load all mobiles from database
    $scope.$on('$viewContentLoaded', function () {
        if($scope.mobiles.length == 0)
            $scope.loadMobiles();
    });


    // send ajax to destroy current session
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

app.controller('cartController', function ($scope, $location, $http, ngCart) {
    $scope.isActive = function (route) {
        return route === $location.path();
    };

    // update cart's status text
    $scope.update = "";

    // if user click cancel then empty the cart
    $scope.cancel = function () {
        ngCart.empty(true);
        //$location.path("/store");
    };

    // return boolean if cart is empty
    $scope.isCartEmpty = function () {
        return ngCart.totalCost() != 0;
    };


    // update the stock when customer buy the item
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
            total_price: total_price,
            currency: items[0].getData()
        }).success(function (data) {
            console.log(data);
            if (data == "success") {
                ngCart.empty(true);
                $scope.update = "Congratulation, you will get your product soon!";
            } else if (data == "fail") {

            }
        });
    };

    // destroy session
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

    // load all transaction when content is loaded
    $scope.$on('$viewContentLoaded', function () {
        $scope.getTransactions();
    });

    // get all transactions and records from the database
    $scope.getTransactions = function () {
        return $scope.transactions.length ? null : $http.post('../database/get_transactions.php').success(function (data) {
            $scope.transactions = data;
            $scope.selectedTransaction = $scope.transactions[$scope.transactions.length-1].id;
            $scope.getRecords();
        });
    };

    // get all records
    $scope.getRecords = function () {
        //alert($scope.selectedTransaction);
        $http.post('../database/get_records.php', {
            tid: $scope.selectedTransaction
        }).success(function (data) {
            $scope.records = data;

        });
    };

    // destroy session
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