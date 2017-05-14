const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babelJs', () => {
    gulp.watch(['./**/src/*.js', '!./node_modules/**/'], () => {
        gulp.src('./**/src/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('dist'));
    });
});


gulp.task('default', ['babelJs']);