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

	it('renders the table from csv file retrieved', function() {
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

	});


})