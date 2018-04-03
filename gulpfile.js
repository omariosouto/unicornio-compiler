var gulp = require('gulp');
var util = require('gulp-util');
var markdownDocs = require('gulp-markdown-docs');
 
gulp.task('default', function () {
    const LANGUAGE = util.env.language.toLowerCase()

    return gulp
                .src(`apostilas/${LANGUAGE}/*.md`)
                .pipe(markdownDocs('index.html'))
                .pipe(gulp.dest(`./apostilas/${LANGUAGE}/build/html-partial/`));
});