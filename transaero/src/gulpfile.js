var gulp = require('gulp'),
    sass = require('gulp-sass');
    pug = require('gulp-pug');
    imagemin = require("gulp-imagemin");
    pngquant = require('imagemin-pngquant');
    svgstore = require("gulp-svgstore");
    rename = require("gulp-rename");
    uglify = require("gulp-uglify");
    autoprefixer = require("autoprefixer");
    postcss = require('gulp-postcss');
    csscomb = require("gulp-csscomb");
    mmq = require('gulp-merge-media-queries');
    copy = require("gulp-copy");
    cssmin = require("gulp-cssmin");
    runSequence = require('run-sequence');
    
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.sass', 'sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'))
  });

gulp.task('pug', function buildHTML() {
  return gulp.src('pug/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('html'))
});

gulp.task('watch', function() {
  gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['sass']);
  gulp.watch(['pug/*.pug'], ['pug']); 
});

gulp.task("min-svg", function(){
	return gulp.src("svg/svg-src/*.svg")
	.pipe(imagemin({
		optimizationLevel: 3,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest("svg/svg-min/"));
})

gulp.task("svgstore", function(){
	return gulp.src("svg/svg-min/*.svg")
	.pipe(svgstore())
	.pipe(rename("svgsprite.svg"))
	.pipe(gulp.dest("svg/svg-sprite/"))
	
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "external/**/*.*", "font/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
})

gulp.task("style", function(){
  return gulp.src("css/common.css")
  .pipe(postcss([ 
    autoprefixer({ browsers: ['last 2 versions'] }) 
  ]))
  .pipe(csscomb())
  .pipe(mmq())
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest("../build/css"));
})

gulp.task("min-js", function(){
  return gulp.src("js/script.js")
  .pipe(uglify())
  .pipe(gulp.dest("../build/js"));
})

gulp.task("min-images", function(){
  return gulp.src("images/*.{jpg,png}")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("../build/images"));
})

gulp.task('default', ['watch']);

gulp.task('build', function(callback) {
  runSequence("min-js", "style", "min-images", "copy", callback);
});