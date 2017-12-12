var gulp = require('gulp'),
    inlineFonts = require('gulp-inline-fonts');

function generateInlineFont(family, style) {
    return gulp.src([`Kards10/fonts/${family}/${family}-${style}*`])
        .pipe(inlineFonts({ name: `${family}-${style}` }))
        .pipe(gulp.dest(`Kards10/css/fonts/${family}`));
}
gulp.task('poppins', function() {
    return generateInlineFont("poppins", "semibold");
});