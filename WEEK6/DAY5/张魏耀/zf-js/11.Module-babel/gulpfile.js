var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('babel', function(){
    return gulp.src(['./src/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function () {
    browserify({
        entries: ['./src/main.js']
    })
    .transform('babelify', {presets: ["es2015", "stage-0"]})
    .bundle()
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function(){
    gulp.watch(['src/*.js'], ['browserify']);
});

gulp.task('default', ['watch']);

