'use strict';

angular.module('stackingApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, $window) {

    $scope.logged=Auth.isLoggedIn;
    $scope.user=Auth.getCurrentUser();

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
