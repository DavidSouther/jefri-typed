'use strict';

let gulp = require('gulp');

const SOURCES = 'src/**/*.ts';
const TEST_SOURCES = 'src/**/*.{mock,spec}.ts';
const TYPEDEPS = 'src/typings/**/*.d.ts';
const COMPILED_TEST_SOURCES = 'dist/**/*.spec.js';

const DEFAULT_TASKS = ['test', 'tslint'];

let destination = gulp.dest('dist');

/**
 * Typescript gets compiled from src/ to dist/
 */
let gts = require('gulp-typescript');
let tsProject = gts.createProject('tsconfig.json');
let ts = gts(tsProject);
gulp.task('build:tsc', function() {
  return gulp.src([SOURCES]).pipe(ts).pipe(destination);
});

/**
 * Lint checks all of our code.
 */
let tslintconfig = require('./tslint.json');
let tslint = require('gulp-tslint');
gulp.task('tslint', function() {
  return gulp.src([SOURCES, `!${TYPEDEPS}`])
      .pipe(tslint({configuration: tslintconfig}))
      .pipe(tslint.report('prose'));
});

/**
 * Mocha tests *.spec.js in dist.
 */
let mochaconfig = require('./mochaconfig.json');
let mocha = require('gulp-mocha')(mochaconfig);
gulp.task('test', ['build:tsc'], function() {
  return gulp.src([COMPILED_TEST_SOURCES]).pipe(mocha);
});

/**
 * Some default tasks.
 */
gulp.task('default', DEFAULT_TASKS);
gulp.task('watch', 'default', function() { gulp.watch([SOURCES], 'default'); });

if (require.main === module) {
  gulp.runTask('default');
}
