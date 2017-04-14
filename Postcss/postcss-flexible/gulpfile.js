var gulp = require('gulp');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean'); //清理文件夹

var cssnext = require('postcss-cssnext');
var precss = require('precss');
var flexible = require('postcss-flexible');

gulp.task('css', function () {
    var processors = [
        // autoprefixer({ browsers: ['last 1 version'] }),
        cssnext({
            browsers: 'Android >= 4, iOS >= 7',
            features: {
                customProperties: {
                    variables: require('./src/css/variables')
                }
            }
        }),
        flexible({
            remUnit: 75
        }),
        // precss
    ];

    return gulp.src('./src/**/*.css').pipe(postcss(processors)).pipe(gulp.dest('./dist'));
});

gulp.task('testcss', function () {
    var processors = [
        // autoprefixer({ browsers: ['last 1 version'] }),
        cssnext,
        precss
    ];

    return gulp.src('./src/**/test.css').pipe(postcss(processors)).pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    return gulp.src('./src/**/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('build', [
    'css',
    'js',
    'html'
]);  //批量执行