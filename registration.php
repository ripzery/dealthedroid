<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/freelancer.css">
    <link href='css/bootstrap-vertical-grid.css' rel='stylesheet' type='text/css'>

</head>
<body ng-app="formValidator" ng-controller="FormController">
<div class="containe2r">

    <?php
    include("header.php");
    ?>

    <div class="row-xs-1"></div>
    <div class="row-xs-8">
        <div
            class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-offset-3 col-xs-6">
            <div class="panel panel-primary" id="content">
                <div class="panel-heading">
                    <h1 class="text-center">Registration</h1>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
                        <form class="form-horizontal" role="form" ng-model="myForm" name="myForm"
                              ng-submit="submitMyForm(myForm.$valid)" novalidate method="post">
                            <div class="form-group" ng-class="{ 'has-error' : {{usernamerule}}}">
                                <div class="col-lg-3">
                                    <label class="control-label">Username </label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="text" ng-model="username" placeholder="Username" name="username"
                                           pattern="^[a-zA-Z][a-zA-Z0-9-_\.]+" required class="form-control"
                                           ng-minlength="3" maxlength="15">

                                </div>
                                <div class="col-lg-12 text-center" style="margin-top: 10px;">
                                    <p ng-show="myForm.username.$error.required && !myForm.username.$pristine"
                                       class="help-block">Username is required.</p>

                                    <p ng-show="myForm.username.$error.minlength" class="help-block">Username is too
                                        short.</p>

                                    <p ng-show="myForm.username.$error.pattern && !myForm.username.$pristine"
                                       class="help-block">Username shouldn't contain the special characters..</p>
                                </div>

                            </div>

                            <div class="form-group" ng-class="{'has-error' : {{ passwordrule }}}">
                                <div class="col-lg-3">
                                    <label for="password" class="control-label">Password</label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="password" name="password" ng-model="password" placeholder="Password"
                                           required
                                           pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                                           ng-minlength="8"
                                           class="form-control">
                                </div>

                                <div class="col-lg-12 text-center" style="margin-top: 10px;">
                                    <p ng-show="myForm.password.$error.required && !myForm.password.$pristine"
                                       class="help-block">Password is
                                        required.</p>

                                    <p ng-show="myForm.password.$error.minlength" class="help-block">Password is too
                                        short.</p>

                                    <p ng-show="myForm.password.$error.pattern && !myForm.password.$pristine"
                                       class="help-block">The password must contain number, uppercase, and lowercase
                                        characters.</p>
                                </div>
                            </div>

                            <div class="form-group" ng-class="{'has-error' : {{ password2rule }}}">
                                <div class="col-lg-3">
                                    <label class="control-label" for="password2">Confirm</label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="password" ng-model="password2" placeholder="Confirm password"
                                           name="password2"
                                           required
                                           password-match="password"
                                           class="form-control">
                                </div>
                                <div class="col-lg-12 text-center" style="margin-top: 10px;">
                                    <p ng-show=" myForm.password2.$error.unique" class="help-block">Password isn't
                                        match</p>
                                </div>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary btn-lg center-block" ng-disabled="myForm.$invalid"
                                        id="register"> Submit
                                </button>
                                <!--<button class="btn btn-primary" id="reset" ng-click="resetForm()"> Reset</button>-->
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>
<script src="library/js/jquery.js"></script>
<script src="library/js/angular.min.js"></script>
<script src="js/my-validator.js"></script>
</body>
</html>

<!--── ── ██ ██ ── ── ── ── ── ── ── ██ ██ ── ──
 ── ██ ░░ ░░ ██ ██ ██ ██ ██ ▓▓ ▓▓ ░░ ░░ ██ ──
 ── ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ▓▓ ▓▓ ▓▓ ▓▓ ██ ──
 ── ── ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ▓▓ ▓▓ ── ──
 ── ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ──น่ารักจุงกะเบย
 ── ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ──
 ██ ██ ░░ ░░ ██ ░░ ░░ ░░ ░░ ░░ ██ ░░ ░░ ██ ██
 ── ██ ░░ ░░ ██ ░░ ░░ ░░ ░░ ░░ ██ ░░ ░░ ██ ──
 ██ ██ ░░ ░░ ░░ ░░ ░░ ▌▌ ░░ ░░ ░░ ░░ ░░ ██ ██
 ── ── ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ── ──
 ── ██ ░░ ██ ░░ ░░ ░░ ░░ ░░ ░░ ░░ ██ ░░ ██ ──
 ── ── ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ── ──
 ── ██ ▒▒ ▒▒ ▓▓ ▓▓ ▒▒ ▒▒ ▒▒ ▓▓ ▓▓ ▒▒ ▒▒ ██ ──
 ██ ▒▒ ▒▒ ▒▒ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▒▒ ▒▒ ▒▒ ██
 ██ ░░ ░░ ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ██
 ██ ░░ ░░ ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ░░ ░░ ██
 ── ██ ██ ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ██ ██ ──
 ── ── ── ██ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ██ ── ── ──
 ── ── ── ██ ██ ██ ██ ██ ██ ██ ██ ██ ── ── ──
 ── ── ── ██ ░░ ░░ ░░ ██ ░░ ░░ ░░ ██ ── ── ──
── ── ── ── ██ ██ ██ ██ ██ ██ ██ ── ── ── ──-->