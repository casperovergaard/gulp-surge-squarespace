var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var surge = require('gulp-surge');
var browserSync = require('browser-sync').create();

gulp.task('styles', function(){
  gulp.src(['src/styles/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles/'))
  gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('styles-watch', ['styles'], function (done) {
  browserSync.reload();
  done();
})

gulp.task('deploy', ['styles'], function () {
  return surge({
    project: './',
    // Replace with surge domain
    domain: 'https://testsite-build1.surge.sh'
  });
});

gulp.task('watch', ['styles'], function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("src/**/*", ['styles-watch']);
});
