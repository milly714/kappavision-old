/// ts:ref=angular.d.ts
/// <reference path="../defs/angular.d.ts"/> ///ts:ref:generated

var app = angular.module("kappavision", ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial']);

interface TestScope extends ng.IScope {
  helloPrefix:string;
  helloName:string;
}

app.config(function($mdThemingProvider) {
    var twitchPurpleMap = $mdThemingProvider.extendPalette('deep-purple', {
        '500': '6441A5',
        '300': 'A68ED2'
    });

    $mdThemingProvider.definePalette('twitchPurple', twitchPurpleMap);
});

app.controller('SideBarController', function($scope, $mdSidenav, $log) {
   $scope.$on('toggleLeft', function() {
       $scope.toggleLeft();
   });
   $scope.toggleLeft = function() {
       $mdSidenav('left').toggle();
   }
});

app.controller('MainContentController', function($scope, $log) {
    $scope.toggleLeft = function() {
        $scope.$broadcast('toggleLeft');
    }
});

app.controller('TestController', ($scope:TestScope) => {
  $scope.helloPrefix = 'Hello';
  $scope.helloName = 'World';
});
