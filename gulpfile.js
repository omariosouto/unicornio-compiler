var gulp = require('gulp');
var markdownDocs = require('gulp-markdown-docs');
 
gulp.task('default', function () {
  return gulp.src('apostila/*.md')
    .pipe(markdownDocs('index.html', {
        yamlMeta: true
    }))
    .pipe(gulp.dest('./build/01-html/'));
});