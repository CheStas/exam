var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
var imageMin = require('gulp-imagemin');

gulp.task('sass', function() {
    return sass('src/components/main.scss')
        .on('error', sass.logError)
        .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename('app.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/style'));
});

gulp.task('css-ie', function() {
    return gulp.src('src/components/ie8.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/style'));
});

gulp.task('script', function () {
    return gulp.src('src/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function(){
    return gulp.src('src/theme/fonts/*')
        .pipe(gulp.dest('dist/style/fonts'))
});

gulp.task('images', function(){
    return gulp.src('src/theme/images/*.*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb( !(/.DS_Store/.test(filePath)) );
                }
            },
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'sass', 'script', 'images', 'fonts', 'webserver', 'css-ie');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/components/**/*.scss', ['sass']);
    gulp.watch('src/components/**/*.js', ['script']);
    gulp.watch('src/theme/images/*.*', ['images']);
});
