

var validator = angular.module('formValidator', []);

validator.controller('FormController', function ($scope, $http) {

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

        $.post("../../dealthedroid/database/authen.php", {username: $scope.username, password: $scope.password})
            .done(function (result) {
                $scope.loginStatus = result;
                if (result)
                    window.location.href = "main/management.html";
            });
    };

});

validator.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.password2;

                //get the value of the other password
                var e2 = scope.password
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


/*******************************************************************
 * ADD NEW CODE !
 * ─ ── ── ── ── ── ── ██ ██ ██ ██ ── ██ ██ ██ ──
 * ── ── ── ── ── ██ ██ ▓▓ ▓▓ ▓▓ ██ ██ ░░ ░░ ░░ ██
 * ── ── ── ── ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ░░ ██
 * ── ── ── ██ ▓▓ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ░░ ░░ ██
 * ── ── ██ ▓▓ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ██ ██ ░░ ██
 * ── ── ██ ▓▓ ██ ██ ░░ ░░ ░░ ░░ ░░ ░░ ██ ██ ██ ──
 * ── ██ ██ ██ ██ ░░ ░░ ░░ ██ ░░ ██ ░░ ██ ▓▓ ▓▓ ██
 * ── ██ ░░ ██ ██ ░░ ░░ ░░ ██ ░░ ██ ░░ ██ ▓▓ ▓▓ ██
 * ██ ░░ ░░ ██ ██ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ▓▓ ██
 * ██ ░░ ░░ ░░ ██ ░░ ░░ ██ ░░ ░░ ░░ ░░ ░░ ██ ▓▓ ██
 * ── ██ ░░ ░░ ░░ ░░ ██ ██ ██ ██ ░░ ░░ ██ ██ ██ ──
 * ── ── ██ ██ ░░ ░░ ░░ ░░ ██ ██ ██ ██ ██ ▓▓ ██ ──
 * ── ── ── ██ ██ ██ ░░ ░░ ░░ ░░ ░░ ██ ▓▓ ▓▓ ██ ──
 * ── ░░ ██ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ██ ▓▓ ██ ── ──
 * ── ██ ▓▓ ▓▓ ▓▓ ▓▓ ██ ██ ░░ ░░ ░░ ██ ██ ── ── ──
 * ██ ██ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ░░ ░░ ░░ ██ ── ── ──
 * ██ ██ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ░░ ░░ ░░ ██ ── ── ──
 * ██ ██ ██ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ░░ ██ ██ ██ ██ ──
 * ── ██ ██ ██ ▓▓ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ██ ██ ──
 * ── ── ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ▓▓ ▓▓ ██
 * ── ██ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ██ ██ ▓▓ ▓▓ ▓▓ ██
 * ██ ██ ▓▓ ██ ██ ██ ██ ██ ██ ██ ██ ██ ▓▓ ▓▓ ▓▓ ██
 * ██ ▓▓ ▓▓ ██ ██ ██ ██ ██ ██ ██ ██ ██ ▓▓ ▓▓ ▓▓ ██
 * ██ ▓▓ ▓▓ ██ ██ ██ ██ ██ ── ── ── ██ ▓▓ ▓▓ ██ ██
 * ██ ▓▓ ▓▓ ██ ██ ── ── ── ── ── ── ── ██ ██ ██ ──
 * ── ██ ██ ── ── ── ── ── ── ── ── ── ── ── ── ──
 ********************************************************************/
