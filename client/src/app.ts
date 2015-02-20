/// ts:ref=angular.d.ts
/// <reference path="../defs/angular.d.ts"/> ///ts:ref:generated

var app = angular.module("kappavision", ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial']);

interface TestScope extends ng.IScope {
  helloPrefix:string;
  helloName:string;
}

app.controller('TestController', ($scope:TestScope) => {
  $scope.helloPrefix = 'Hello';
  $scope.helloName = 'World';
});
