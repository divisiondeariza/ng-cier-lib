angular.module('myModule.templates').run(['$templateCache', function($templateCache) {$templateCache.put('ng-cier-lib/directives/csvTableDirective/csvTableDirective.html','<div><table><thead><tr><th ng-repeat="header in tableHeaders" ng-bind="header"></th></tr></thead><tbody><tr ng-repeat="row in tableData"><td ng-repeat="datum in row" ng-bind="datum"></td></tr></tbody></table></div>');}]);