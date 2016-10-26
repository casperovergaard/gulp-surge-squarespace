var gulp = require('gulp'),
    sass = require('gulp-sass'),
    surge = require('gulp-surge'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

// gulp.task('styles', function(){
//   gulp.src(['src/styles/*.scss'])
//     .pipe(plumber({
//       errorHandler: function (error) {
//         console.log(error.message);
//         this.emit('end');
//     }}))
//     .pipe(sass())
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('dist/styles/'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dist/styles/'))
//   gulp.src(['src/fonts/**/*'])
//     .pipe(gulp.dest('dist/fonts/'));
// });

gulp.task('styles', function() {
  return gulp.src(['src/styles/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
    return del(['dist/styles', 'dist/scripts']);
});

// gulp.task('styles-watch', ['styles'], function (done) {
//   browserSync.reload();
//   done();
// })

gulp.task('deploy', ['clean'], function () {
  gulp.start('styles', 'scripts');
  return surge({
    project: './',
    // Replace with surge domain
    domain: 'https://testsite-build1.surge.sh'
  });
});

// gulp.task('watch', ['styles'], function(){
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });
//   gulp.watch("src/**/*", ['styles-watch']);
// });
