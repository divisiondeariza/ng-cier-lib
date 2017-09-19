var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

// tests
var testDirectory = path.join(rootDirectory, './test/unit');

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files

  path.join(sourceDirectory, '/**/*.js'),
  '.tmp/my-module-templates.js',
  ];

  var dependenceFiles = [
  //'bower/angular/angular.min.js',
  //'bower/angular-cookies/angular-cookies.min.js',
  //'bower/angular-nvd/dist/angular-nvd3.min.js',
  //'bower/angular-resource/angular-resource.min.js',
  //'bower/angular-sanitize/angular-sanitize.min.js',
  'bower/angular-tablesort/js/angular-tablesort.js',
  //'bower/d3/d3.min.js',
  ];

  var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
  ].concat(sourceFiles);

  gulp.task('templates', function () {
    return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
      filename: 'my-module-templates.js',
      module: 'ngCierLib'
    }))
    .pipe(gulp.dest('.tmp'));
  });

  gulp.task('dependences', function(){
    return gulp.src(dependenceFiles)
   .pipe(plumber())
   .pipe(concat('my-deps.js'))
   .pipe(uglify())
   .pipe(gulp.dest('.tmp'));

 });

  gulp.task('build', ['templates'], function() {
    gulp.src(dependenceFiles.concat(sourceFiles))
    .pipe(plumber())
    .pipe(concat('ng-cier-lib.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./misc/demo'))
    .pipe(uglify())
    .pipe(rename('ng-cier-lib.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./misc/demo'));
  });

/**
 * Process
 */
 gulp.task('process-all', function (done) {
  runSequence('jshint', 'templates', 'test-src', 'build', done);
});

/**
 * Watch task
 */
 gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);

  // watch test files and re-run unit tests when changed
  gulp.watch(path.join(testDirectory, '/**/*.js'), ['test-src']);
});

/**
 * Validate source JavaScript
 */
 gulp.task('jshint', function () {
  return gulp.src(lintFiles)
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
 gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
 gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
 gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

 gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
