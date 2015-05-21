var myApp = angular.module('myApp', ['ui.router','angular.css.injector']);

// define route and controller for each view
myApp.config(function ($stateProvider, $urlRouterProvider, cssInjectorProvider) {
    $urlRouterProvider.otherwise("/welcome");
    $stateProvider
        .state('welcome', {
            url: '/welcome',
            views: {
                "navbar": {
                    templateUrl: "header.html",
                    controller: "welcomeController"
                },
                "content": {
                    templateUrl: "welcome.html"
                }
            }
        })
        .state('signup', {
            url: '/signup',
            views: {
                "navbar": {
                    templateUrl: "header.html",
                    controller: 'formController'
                },
                "content": {
                    templateUrl: "signup.html",
                    controller: 'formController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                "navbar": {
                    templateUrl: "header.html",
                    controller: 'formController'
                },
                "content": {
                    templateUrl: "login.html",
                    controller: 'formController'
                }
            }
        });

    //cssInjectorProvider.setSinglePageMode(true);
});

myApp.controller('welcomeController', function ($scope, cssInjector,themeService) {
    cssInjector.removeAll();
    $scope.theme = themeService.theme;
    if ($scope.theme == "bootstrap-backup") {
        $scope.labelTheme = "white";
    } else {
        $scope.labelTheme = "";
    }
    cssInjector.add("library/css/"+ $scope.theme +".css");
    $scope.bootstraps = themeService.bootstraps;

    $scope.themeChange = function(theme){
        themeService.setTheme($scope.theme);
        cssInjector.removeAll();
        cssInjector.add("library/css/" + theme + ".css");
        if(theme == "bootstrap-backup"){
            $scope.labelTheme = "white";
        }else{
            $scope.labelTheme = "";
        }
    };
});


// define controller for form validation
myApp.controller('formController', function ($scope, $http, cssInjector, themeService) {
    cssInjector.removeAll();
    $scope.theme = themeService.theme;
    if ($scope.theme == "bootstrap-backup") {
        $scope.labelTheme = "white";
    } else {
        $scope.labelTheme = "";
    }
    cssInjector.add("library/css/"+ $scope.theme +".css");
    $scope.bootstraps = themeService.bootstraps;

    $scope.themeChange = function(theme) {
        themeService.setTheme($scope.theme);
        cssInjector.removeAll();
        cssInjector.add("library/css/" + theme + ".css");
        if (theme == "bootstrap-backup") {
            $scope.labelTheme = "white";
        } else {
            $scope.labelTheme = "";
        }
    };

    // define rule that permit form submitted if the value is match the rule
    $scope.passwordrule = "myForm.password.$invalid && myForm.password.$dirty";
    $scope.password2rule = "myForm.password2.$invalid && myForm.password2.$dirty";
    $scope.usernamerule = "myForm.username.$invalid && myForm.username.$dirty";

    // when submit the form, send ajax request to record data in database
    $scope.submitMyForm = function (isValid) {

        if (isValid) {
            $.post("../../dealthedroid/database/register.php", {username: $scope.username, password: $scope.password})
                .done(function (result) {
                    alert(result);
                });

        }

    };

    // when user is logged in, check if user is admin or customer then redirect to accessible page
    $scope.login = function () {

        $http.post("database/authen.php", {username: $scope.username, password: $scope.password})
            .success(function (result) {
                switch (result) {
                    case "admin":
                        $scope.loginStatus = true;
                        window.location.href = "main/management.html#/stock";
                        break;
                    case "user":
                        $scope.loginStatus = true;
                        window.location.href = "store/index.html#/store";
                        break;
                    default:
                        $scope.loginStatus = false;
                        break;
                }
            });
    };
});

myApp.service('themeService', function () {

    this.theme = "bootstrap-backup";

    this.setTheme = function(theme){
      this.theme = theme;
    };

    this.bootstraps = [
        {name: 'Paper', url: 'bootstrap'},
        {name: 'Flatly', url: 'bootstrap-backup'}
    ];

});

myApp.controller('mainController',function($scope,themeService){
    $scope.css = themeService.theme;
    $scope.bootstraps = themeService.bootstraps;

});

// define Angularjs' directive to check if two input password is the same
myApp.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.password2;

                //get the value of the other password
                var e2 = scope.password;
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
}]);