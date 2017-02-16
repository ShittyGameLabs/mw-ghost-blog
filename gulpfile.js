"use strict";

let gulp =          require('gulp'),
    sass =          require('gulp-sass'),
    concat =        require('gulp-concat'),
    autoprefixer =  require('gulp-autoprefixer'),
    plumber =       require('gulp-plumber'),
    notify =        require('gulp-notify');


const config = {};
config.srcCSS = 'dev/scss/**/*.scss';
config.destCSS = 'assets/css/';


gulp.task('sass', () => {
    gulp.src(config.srcCSS)
        .pipe(plumber({
            errorHandler: notify.onError("Error: \n <%= error.message %>")
            }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: [
                "last 10 versions",
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "safari < 6",
                "firefox < 49",
                "opera < 12.1",
                "explorer > 11",
                "iOS >= 6"
            ]
        }))
        .pipe(gulp.dest(config.destCSS))
        .pipe(notify({
            message: 'Sass complete'
        }));
});

// Watch, apply only on Dev Environment
gulp.task('watch', () => {
    gulp.watch(config.srcCSS, ['sass'])
    // gulp.watch();
});

// PLEASE USE IT ON YOUR LOCAL ENV.
gulp.task('default', ['sass', 'watch']);


//production
gulp.task('production', ['sass']);


