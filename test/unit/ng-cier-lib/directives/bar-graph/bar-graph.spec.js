'use strict';

describe('bar-graph', function () {
  var scope, $compile, $rootScope, element;

  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);
    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(module('ngSanitize', 'ngCierLib'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    if (element) element.remove();
  });

  describe('as an element', function(){ 
    describe('when created', function () {
      describe('default options', function(){
        var options;
        beforeEach(function(){
          element = createDirective('<bar-graph></bar-graph>');
          options = element.children().scope().options;
        });

        it('should set chart.type as discreteBarChart', function(){
          expect(options.chart.type).toEqual('discreteBarChart');
        });

        it('should set chart.height as 450', function(){
          expect(options.chart.height).toEqual(450);
        });

        it('should set chart.x as function(d){return d.label;}', function(){
          expect(options.chart.x({label:"some-label"})).toEqual("some-label");
        });

        it('should set chart.y as function(d){return d.value + (1e-10);},', function(){
          expect(options.chart.y({value:10})).toEqual(10 + (1e-10));
        });

        it('should set chart.showValues as true;', function(){
          expect(options.chart.showValues).toEqual(true);
        });


      });

      describe('get data file', function(){
        var $http
        beforeEach(function(){
          inject(function($httpBackend){
            $http = $httpBackend;
            var authRequestHandler = $http
            .whenRoute('GET', 'example.com/data.json')
            .respond(function(method, url, data, headers, params) {
              return [200, '[{"key":"Cumulative Return","values":[{"label":"A","value":-29.765957771107},{"label":"B","value":0},{"label":"C","value":32.807804682612}]}]'];
            });


          });
        });

        it('should set data correctly', function(){
          $http.expectGET('example.com/data.json');
          var element = createDirective('<bar-graph src="example.com/data.json"></bar-graph>');
          $http.flush();
          var data = element.children().scope().data;
          expect(data).toEqual([
          {
            key: 'Cumulative Return',
            values: [
            {
              'label' : 'A' ,
              'value' : -29.765957771107,
              'series':0
            } ,
            {
              'label' : 'B' ,
              'value' : 0,
              'series':0
            } ,
            {
              'label' : 'C' ,
              'value' : 32.807804682612,
              'series':0
            }
            ]
          }
          ])

        }) 
      });
});
});
/*  describe('as an attribute', function(){ runTestsWithTemplate('<div bar-graph></div>'); });*/


function runTestsWithTemplate(template) {
  describe('when created', function () {

    it('should initial the value to 0', function () {
      element = createDirective(template);

      expect(element.text()).toContain('0');
    });
  });
}

});