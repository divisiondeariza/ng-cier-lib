(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ngCierLib.config', [])
      .value('ngCierLib.config', {
          debug: true
      });

  // Modules
  angular.module('ngCierLib.directives', ['nvd3']);
  angular.module('ngCierLib.filters', []);
  angular.module('ngCierLib.services', []);
  angular.module('ngCierLib',
      [
          'ngCierLib.config',
          'ngCierLib.directives',
          'ngCierLib.filters',
          'ngCierLib.services',
          'ngResource',
          'ngCookies',
          'ngSanitize',
          'tableSort'
      ]);

})(angular);

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
angular.module('ngCierLib.directives')
.directive('csvTable',['$http', function($http){
	function link(scope, element, attr) {
		scope.tableHeaders = [];
		scope.tableData = [];
		$http.get(scope.src).
		then(function(response){
			var rows = response.data.split('\n').map(function(rowString){
				return rowString.split(',');
			});
			scope.tableHeaders = rows[0];
			scope.tableData = rows.splice(1).map(function(rawRow){
				var row = {};
				scope.tableHeaders.forEach(function(header, index){
					row[header] = rawRow[index];
				});
				return row;
			});
			// console.log(scope.tableData);
		});
	}

	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'ng-cier-lib/directives/csvTable/csvTable.html',
		scope: {
			src: '@'
		},
		link:link
	};
}]);



angular.module('ngCierLib').run(['$templateCache', function($templateCache) {$templateCache.put('ng-cier-lib/directives/bar-graph/bar-graph.html','<div class="bar-graph"><nvd3 options="options" data="data"></nvd3></div>');
$templateCache.put('ng-cier-lib/directives/csvTable/csvTable.html','<div><table ts-wrapper><thead><tr><th ng-repeat="header in tableHeaders" ng-bind="header" ts-criteria="{{header}}"></th></tr></thead><tbody><tr ng-repeat="row in tableData" ts-repeat><td ng-repeat="header in tableHeaders">{{row[header]}}</td></tr></tbody></table></div>');}]);