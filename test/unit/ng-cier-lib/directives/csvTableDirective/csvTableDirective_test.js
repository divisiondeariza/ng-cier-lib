'use strict';

describe('csvTable directive', function(){
	var compile, scope, directiveElem, $http;

	function getCompiledElement(){
		var element = angular.element('<csv-table src="example.com/table.csv"></csv-table>');
		var compiledElement = compile(element)(scope);
		scope.$digest();
		return compiledElement;
	}

	beforeEach(function(){
		module('ngCierLib');
		//module("my.templates");
		inject(function($compile, $rootScope, $httpBackend){
			compile = $compile;
			scope = $rootScope.$new();
			$http = $httpBackend;
            var authRequestHandler = $http
			.whenRoute('GET', 'example.com/table.csv')
			.respond(function(method, url, data, headers, params) {
				return [200, "header 1,header 2\nd11,d12\nd21,d22"];
			});


		});
	});

	afterEach(function() {
		$http.verifyNoOutstandingExpectation();
		$http.verifyNoOutstandingRequest();
	});


	it('should be rendered', function(){
		directiveElem = getCompiledElement();
		expect(directiveElem.html()).not.toEqual('');
		$http.flush();
	});

	it('GET scope.src', function() {
		$http.expectGET('example.com/table.csv');
		directiveElem = getCompiledElement();
		$http.flush();
	});


	it("sets scope.tableHeaders correctly", function(){
		$http.expectGET('example.com/table.csv');
		var element = getCompiledElement();
		$http.flush();
		var tableHeaders = element.children().scope().tableHeaders;
		expect(tableHeaders).toEqual(["header 1", "header 2"]);
	})

	it("sets scope.tableData correctly", function(){
		$http.expectGET('example.com/table.csv');
		var element = getCompiledElement();
		$http.flush();
		var tableData = element.children().scope().tableData;
		var expectedTableData = [
									{"header 1": "d11", "header 2":"d12"},
									{"header 1": "d21", "header 2":"d22"},
									]
		console.log(expectedTableData);
		expect(angular.equals(tableData, expectedTableData)).toBeTruthy();
	})

/*	it('renders the table from csv file retrieved', function() {
		$http.expectGET('example.com/table.csv');
		directiveElem = getCompiledElement();
		$http.flush();
		var tableHead = angular.element(directiveElem).find("table").find("thead");
		var tableBody = angular.element(directiveElem).find("table").find("tbody");
		expect(tableHead.find("th")[0].textContent).toEqual("header 1");
		expect(tableHead.find("th")[1].textContent).toEqual("header 2");
		expect(tableBody.find("td")[0].textContent).toEqual("d11");
		expect(tableBody.find("td")[1].textContent).toEqual("d12");
		expect(tableBody.find("td")[2].textContent).toEqual("d21");
		expect(tableBody.find("td")[3].textContent).toEqual("d22");

	});*/


})