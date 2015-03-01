/// ts:ref=app.ts
/// <reference path="./app.ts"/> ///ts:ref:generated

app.config(($routeProvider:ng.route.IRouteProvider) => {
  $routeProvider.when("/", {
    templateUrl: "src/views/home.html"
  }).otherwise({
    redirectTo: "/"
  })
});