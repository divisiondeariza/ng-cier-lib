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
  angular.module('ngCierLib.directives', []);
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
          'ngSanitize'
      ]);

})(angular);

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
			scope.tableData = rows.splice(1);
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



angular.module('ngCierLib').run(['$templateCache', function($templateCache) {$templateCache.put('ng-cier-lib/directives/csvTable/csvTable.html','<div><table><thead><tr><th ng-repeat="header in tableHeaders" ng-bind="header"></th></tr></thead><tbody><tr ng-repeat="row in tableData"><td ng-repeat="datum in row" ng-bind="datum"></td></tr></tbody></table></div>');}]);