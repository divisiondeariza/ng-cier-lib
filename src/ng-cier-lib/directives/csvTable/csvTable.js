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


