var gulp = require('gulp'),
    sass = require('gulp-sass');
    autoprefixer = require("autoprefixer");
    postcss = require('gulp-postcss');
    csscomb = require("gulp-csscomb");
    copy = require("gulp-copy");
    runSequence = require('run-sequence');
    
    
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'))
  });

gulp.task('watch', function() {
  gulp.watch(['sass/**/*.scss', 'components/**/*.scss'], ['sass']);
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "images/**/*.*", "vendor/**/*.*", "js/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
})

gulp.task("style", function(){
  return gulp.src("css/common.css")
  .pipe(postcss([ 
    autoprefixer({ browsers: ["last 2 versions"] }) 
  ]))
  .pipe(csscomb())
  .pipe(gulp.dest("../build/css"));
})

gulp.task('default', ['watch']);

gulp.task('build', function(callback) {
  runSequence("style", "copy", callback);
});