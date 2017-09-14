'use strict';

angular.module('ngCierLib.directives', [])
.directive('barGraph', function () {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'ng-cier-lib/directives/bar-graph/bar-graph.html',
    replcae: true,
    link: function ($scope) {

      $scope.getValue = function () {
        return value;
      };
      $scope.increment = function () {
        value++;
      };
    }
  };
});