
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Custom CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<!--    <link href='css/app.css' rel='stylesheet' type='text/css'>-->
    <link href='css/style.css' rel='stylesheet' type='text/css'>
    <link href='css/bootstrap-vertical-grid.css' rel='stylesheet' type='text/css'>
    <script src="library/js/angular.min.js"></script>
    <script src="js/my-validator.js"></script>
</head>
<body>
<div class="container" ng-app="formValidator" ng-controller="FormController">

    <?php
    include("header.php");
    ?>
    <div class="row-xs-2"></div>
    <div class="row-xs-8">
        <div
            class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-offset-3 col-xs-6">
            <div class="panel panel-primary" id="content">
                <div class="panel-heading">
                    <h1 class="text-center">Login</h1>
                </div>
                <div class="panel-body">
                    <div
                        class="col-lg-10 col-lg-offset-1 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
                        <form class="form-horizontal" role="form" ng-model="myLoginForm" name="myLoginForm"
                              ng-submit="login(myLoginForm.$valid)" novalidate method="post">
                            <div class="form-group">
                                <div class="col-lg-3">
                                    <label class="control-label">Username </label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="text" ng-model="username" placeholder="Username" name="username"
                                           pattern="^[a-zA-Z][a-zA-Z0-9-_\.]+" required class="form-control"
                                           maxlength="15">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-3">
                                    <label for="password" class="control-label">Password</label>
                                </div>
                                <div class="col-lg-9">
                                    <input type="password" name="password" ng-model="password" placeholder="Password"
                                           required
                                           class="form-control">
                                </div>

                            </div>

                            <div class="col-lg-12 text-center">
                                <p class="help-block" style="color: red;" ng-init="loginStatus=true" ng-model="loginStatus" ng-show=" loginStatus == false && !myLoginForm.loginStatus.$pristine"  >Username or password doesn't correct.</p>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary btn-lg center-block" id="register"> Submit
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
</body>
</html>