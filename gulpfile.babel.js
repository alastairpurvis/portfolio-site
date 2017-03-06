import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import minify from 'gulp-minify-css';
import merge from 'merge-stream';
import imagemin from 'gulp-imagemin';
import clean from 'gulp-clean';
import inlinefrom from 'gulp-inline-source-from';
import htmlrender from 'gulp-htmlrender';
import htmlmin from 'gulp-htmlmin';

// General files task e.g. HTML, PHP
const filesToMove = [
    './source/includes/*.*',
    './source/downloads/*.*',
    './source/samples/*.*',
    './source/fonts/*.*'
];

gulp.task('clean', () => gulp.src(['build/*'], {read:false})
.pipe(clean()));

gulp.task('move', () => {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './source/' })
  .pipe(gulp.dest('build'));
});

// Styles task
gulp.task('styles', () => {
  gulp.src('source/scss/*.scss')
  .pipe(sass())
  .pipe(concat('stylesheet.min.css'))
  .pipe(minify())
  .pipe(gulp.dest('build/'))
  .on('end', () => {
      gulp.src('source/*.html')
        .pipe(htmlrender.render())
        .pipe(inlinefrom())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            html5: true,
            collapseBooleanAttributes: true,
            processConditionalComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeAttributeQuotes: true,
            decodeEntities: true}))
        .pipe(gulp.dest('build'));
  });
});

// Scripts task
gulp.task('scripts', () => {
  gulp.src('source/js/**/*.js')
  .pipe(concat('scripts.min.js'))
  .pipe(babel({
            presets: ['es2015']
        }))
  .pipe(uglify())
  .pipe(gulp.dest('build/'));
});

// Images task
gulp.task('images', () =>
    gulp.src('source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
);

// Watch task
gulp.task('watch', () => {
    gulp.watch('source/**/*.scss', ['styles']);
    gulp.watch('source/**/*.js', ['scripts']);
    gulp.watch('source/*.htm', ['move']);
    gulp.watch('source/*.php', ['move']);
    gulp.watch('source/**/*.php', ['move']);
    gulp.watch('source/**/*.jpg', ['images']);
    gulp.watch('source/**/*.png', ['images']);
    gulp.watch('source/*.html', ['styles']);
});

gulp.task('default', ['move', 'styles', 'scripts', 'images', 'watch']);
