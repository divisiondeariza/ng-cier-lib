'use strict';

angular.module('cier.utils.csvTableDirective',[])
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
		templateUrl: 'src/csvTableDirective/csvTableDirective.html',
		scope: {
			src: '@'
		},
		link:link
	};
}]);


