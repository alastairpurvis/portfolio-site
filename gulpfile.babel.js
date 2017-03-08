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
    './src/includes/*.*',
    './src/downloads/*.*',
    './src/samples/*.*',
    './src/fonts/*.*'
];

gulp.task('clean', () => gulp.src(['dist/*'], {read:false})
.pipe(clean()));

gulp.task('move', () => {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './src/' })
  .pipe(gulp.dest('dist'));
});

// Styles task
gulp.task('styles', () => {
  gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(concat('stylesheet.min.css'))
  .pipe(minify())
  .pipe(gulp.dest('dist/'))
  .on('end', () => {
      gulp.src('src/*.html')
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
        .pipe(gulp.dest('dist'));
  });
});

// Scripts task
gulp.task('scripts', () => {
  gulp.src('src/js/**/*.js')
  .pipe(concat('bundle.min.js'))
  .pipe(babel({
            presets: ['es2015']
        }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
});

// Images task
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Watch task
gulp.task('watch', () => {
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/*.htm', ['move']);
    gulp.watch('src/*.php', ['move']);
    gulp.watch('src/**/*.php', ['move']);
    gulp.watch('src/**/*.jpg', ['images']);
    gulp.watch('src/**/*.png', ['images']);
    gulp.watch('src/*.html', ['styles']);
    gulp.watch('src/views/*.html', ['styles']);
});

gulp.task('default', ['move', 'styles', 'scripts', 'images', 'watch']);
