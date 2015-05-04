var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/welcome");
    $stateProvider
        .state('welcome', {
            url: '/welcome',
            views: {
                "navbar":{
                    templateUrl: "header.html"
                },
                "content":{
                    templateUrl: "welcome.html"
                }
            },
            controller: 'welcomeController'
        })
        .state('signup', {
            url: '/signup',
            views: {
                "navbar":{
                    templateUrl: "header.html"
                },
                "content":{
                    templateUrl: "signup.html",
                    controller: 'formController'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                "navbar":{
                    templateUrl: "header.html"
                },
                "content":{
                    templateUrl: "login.html",
                    controller: 'formController'
                }
            }
        });
});

myApp.controller('welcomeController', function ($scope) {

});

myApp.controller('formController', function ($scope,$http) {
    $scope.passwordrule = "myForm.password.$invalid && myForm.password.$dirty";
    $scope.password2rule = "myForm.password2.$invalid && myForm.password2.$dirty";
    $scope.usernamerule = "myForm.username.$invalid && myForm.username.$dirty";

    $scope.submitMyForm = function (isValid) {

        if (isValid) {
            $.post("../../dealthedroid/database/register.php", {username: $scope.username, password: $scope.password})
                .done(function (result) {
                    alert(result);
                });

        }

    };

    $scope.login = function () {

        $http.post("database/authen.php", {username: $scope.username, password: $scope.password})
            .success(function (result) {
                switch (result){
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