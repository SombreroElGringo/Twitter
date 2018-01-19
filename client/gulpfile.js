const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const { exec } = require('child_process');


// Compile Sass to CSS
gulp.task('scss', () => {
  gulp.src('src/scss/App.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/assets/css'));
});

// Watch Sass files
gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['scss']);
});

// Launch React app
gulp.task('launch', () => {
  exec('react-scripts start');
});

gulp.task('start', ['scss', 'watch', 'launch']);