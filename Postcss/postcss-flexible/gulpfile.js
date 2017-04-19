var gulp = require('gulp');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean'); //清理文件夹
var watch = require('gulp-watch');
var eslint = require('gulp-eslint');
// var livereload = require('gulp-livereload');
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

  return gulp.src('./src/**/*.css')
    // .pipe(watch('./src/**/*.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});

gulp.task('testcss', function () {
  var processors = [
    // autoprefixer({ browsers: ['last 1 version'] }),
    cssnext,
    precss
  ];

  return gulp.src('./src/**/test.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('./dist'));
});

gulp.task('font', function () {
  return gulp.src('./src/css/fonts/**.**').pipe(gulp.dest('./dist/css/fonts'));
});

gulp.task('js', function () {
  return gulp.src('./src/**/*.js')
  .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('eslint', function () {
  return gulp.src(['./src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
// gulp.task('stream', function () {
//     // Endless stream mode 
//     return watch('css/**/*.css', { ignoreInitial: false })
//         .pipe(gulp.dest('build'));
// });

// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
//     return watch('css/**/*.css', function () {
//         gulp.src('css/**/*.css')
//             .pipe(gulp.dest('build'));
//     });
// });
gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['css']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('clean', function () {
  return gulp.src('./dist')
    .pipe(clean());
});

gulp.task('build', ['clean', 'eslint', 'watch'], function () {
  gulp.start('font', 'css', 'js', 'html');
});
/*gulp.task('build', [
  'eslint',
  'font',
  'css',
  'js',
  'html',
  'watch'
]); //批量执行*/
