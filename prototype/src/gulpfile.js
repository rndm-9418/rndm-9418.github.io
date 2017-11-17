var gulp = require("gulp"),
    sass = require("gulp-sass");
    imagemin = require("gulp-imagemin");
    imageminJpegRecompress = require("imagemin-jpeg-recompress");
    pngquant = require("imagemin-pngquant");
    rename = require("gulp-rename");
    uglify = require("gulp-uglify");
    autoprefixer = require("autoprefixer");
    postcss = require("gulp-postcss");
    csscomb = require("gulp-csscomb");
    copy = require("gulp-copy");
    cssmin = require("gulp-cssmin");
    runSequence = require("run-sequence");
    del = require("del");
    
gulp.task("sass", function() {
  return gulp.src(["sass/**/*.scss"])
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(gulp.dest("css"))
  });

gulp.task("watch", function() {
  gulp.watch(["sass/**/*.scss", "components/**/*.scss"], ["sass"]);
});

gulp.task("clean", function() {
  return del("../build/*", {force: true});
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "external/**/*.*", "fonts/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
})

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
})

gulp.task("min-js", function(){
  return gulp.src("js/script.js")
  .pipe(uglify())
  .pipe(gulp.dest("../build/js"));
})

gulp.task("min-raster", function(){
  return gulp.src("images/*.{jpg,png}")
  .pipe(imagemin([
    imageminJpegRecompress({
      loops:4,
      min: 50,
      max: 95,
      quality:"high" 
    }),
    pngquant({quality: "85"})
  ]))
  .pipe(gulp.dest("../build/images"));
})

gulp.task("build", function(callback) {
  runSequence("clean", "min-js", "style", "min-raster", "copy", callback);
});