var gulp = require('gulp')
    uglify = require('gulp-uglify')
    rename = require("gulp-rename")
    sass = require('gulp-sass')
    concat = require('gulp-concat')
    minify = require('gulp-minify-css')
    merge = require('merge-stream')
    imagemin = require('gulp-imagemin')
    clean = require('gulp-clean');

// General files task e.g. HTML, PHP
var filesToMove = [
    './src/includes/*.*',
    './src/downloads/*.*',
    './src/samples/*.*',
    './src/*.html',
    './src/*.htm',
    './src/*.php'
];

gulp.task('clean', function(){
  return gulp.src(['build/*'], {read:false})
  .pipe(clean());
});

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './src/' })
  .pipe(gulp.dest('build'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(concat('stylesheet.css'))
  .pipe(minify())
  .pipe(gulp.dest('build/stylesheets'))
});

// Scripts task
gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '-min'
  }))
  .pipe(gulp.dest('build/scripts'))
});

// Images task
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);

// Watch task
gulp.task('watch', function() {
  gulp.watch('src/*.html', ['move']);
  gulp.watch('src/*.htm', ['move']);
  gulp.watch('src/*.php', ['move']);
  gulp.watch('src/**/*.php', ['move']);
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.jpg', ['images']);
  gulp.watch('src/**/*.png', ['images']);
});

gulp.task('default', ['move', 'styles', 'scripts', 'images', 'watch']);
