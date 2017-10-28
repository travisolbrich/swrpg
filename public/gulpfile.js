var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var Builder = require('systemjs-builder');

var builder = new Builder('./', 'systemjs.config.js');

var coreDeps = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js'
];

gulp.task('bundle-core-deps', function () {
    return gulp.src(coreDeps)
        .pipe(uglify())
        .pipe(concat('core-deps.js'))
        .pipe(gulp.dest('bundle/'))
});

gulp.task('bundle-deps', function () {
    return builder.bundle('app/**/*.js - [app/**/*.js]', 'bundle/dependencies.js', {  minify: true, sourceMaps: true, lowResSourceMaps: true});
})

gulp.task('bundle-app', function () {
    return builder.bundle('[app/**/*.js]', 'bundle/app.js', {  minify: true, sourceMaps: true, lowResSourceMaps: false});
})
