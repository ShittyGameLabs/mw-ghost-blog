"use strict";

let gulp =          require('gulp'),
    sass =          require('gulp-sass'),
    concat =        require('gulp-concat'),
    autoprefixer =  require('gulp-autoprefixer'),
    plumber =       require('gulp-plumber'),
    notify =        require('gulp-notify'),
    minifyCSS =     require('gulp-minify-css'),
    minify =        require('gulp-minify'),
    gutil =         require('gulp-util'),
    babel =         require('gulp-babel');


const config = {
    production: !!gutil.env.production,
    srcCSS: 'dev/scss/**/*.scss',
    destCSS: 'assets/css/',
    srcJS: 'dev/js/*.js',
    destJS: 'assets/js/'
}


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
        .pipe(config.production ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest(config.destCSS))
        .pipe(notify({
            message: 'Sass complete'
        }));
});

gulp.task('scripts', () => { 
    gulp.src(config.srcJS)
    .pipe(plumber({
        errorHandler: notify.onError("Error: \n <%= error.message %>")
    }))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(config.production ? minify({
        ext:{
            src:'.js',
            min:'.js'
        }
    }) : gutil.noop())
    .pipe(gulp.dest(config.destJS))
    .pipe(notify({
    message: 'Scripts complete'
    }));
});

// Watch, apply only on Dev Environment
gulp.task('watch', () => {
    gulp.watch(config.srcCSS, ['sass'])
    gulp.watch(config.srcJS, ['scripts']);
});

//use --production for production.
gulp.task('default', config.production ? ['sass', 'scripts'] : ['sass', 'scripts', 'watch']);


//to do: add src maps


