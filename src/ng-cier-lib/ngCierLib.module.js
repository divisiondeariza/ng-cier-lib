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
