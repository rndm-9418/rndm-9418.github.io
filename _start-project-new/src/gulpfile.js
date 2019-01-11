var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var autoprefixer = require("autoprefixer");
var postcss = require('gulp-postcss');
var csscomb = require("gulp-csscomb");
var copy = require("gulp-copy");
var cssmin = require("gulp-cssmin");
var svgstore = require("gulp-svgstore");
var imageminJpegRecompress = require("imagemin-jpeg-recompress");

gulp.task('clean', function() {
  return del(["../build/*"], {force: true})
});

gulp.task("sass", function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'))
});

gulp.task("watch", function() {
  return gulp.watch(['sass/**/*.scss', 'components/**/*.scss'], gulp.series("sass"));
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "fonts/**/*.*", "vendor/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
});

gulp.task("style", function(){
  return gulp.src("css/common.css")
  .pipe(postcss([ 
    autoprefixer({ browsers: ["last 2 versions", "ie 10"] }) 
  ]))
  .pipe(csscomb())
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest("../build/css"));
});

gulp.task("min-js", function(){
  return gulp.src("js/script.js")
  .pipe(uglify())
  .pipe(gulp.dest("../build/js"));
});

gulp.task("min-images", function(){
  return gulp.src("images/*.{jpg,png}")
  .pipe(imagemin([
    imagemin.gifsicle(),
    imageminJpegRecompress({
      loops:4,
      min: 50,
      max: 95,
      quality:'high' 
    }),
    imagemin.optipng(),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("../build/images"));
});

gulp.task("min-svg", function(){
  return gulp.src("svg/*.svg")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("../build/svg"));
});


//svg-sprites

gulp.task("min-svg-sprite", function(){
  return gulp.src("svg-sprite/svg-src/*.svg")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("svg-sprite/svg-min/"));
});

gulp.task("svgstore", function(){
  return gulp.src("svg-sprite/svg-min/*.svg")
  .pipe(svgstore())
  .pipe(rename("svgsprite.svg"))
  .pipe(gulp.dest("svg-sprite/svg-sprite/"))
  
});

gulp.task("build", gulp.series("clean", "min-js", "style", "min-images", "min-svg", "copy"));

