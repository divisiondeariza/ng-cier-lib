'use strict';

angular.module('ngCierLib.directives')
.directive('barGraph', ['$http', function ($http) {

  return {
    restrict: 'AE',
    templateUrl: 'ng-cier-lib/directives/bar-graph/bar-graph.html',
    replcae: true,
    scope: {
      src: '@'
    },
    link: function ($scope) {

      if($scope.src){
          console.log($scope.src);
            $http.get($scope.src).
            then(function(response){
              $scope.data = response.data;
            });
      }

      $scope.options = {
        chart: {
          type: 'discreteBarChart',
          height: 450,
/*                  margin : {
                   top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                  },*/
                  x: function(d){return d.label;},
                  y: function(d){return d.value + (1e-10);},
                  showValues: true,
                // duration: 500,
/*                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                  }*/
                }
              };


          }
        };
      }]);