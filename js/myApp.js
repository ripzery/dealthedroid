var myApp = angular.module('myApp', ['ui.router']);

// define route and controller for each view
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


// define controller for form validation
myApp.controller('formController', function ($scope,$http) {

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