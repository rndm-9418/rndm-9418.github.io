var gulp = require('gulp'),
    sass = require('gulp-sass');
    imagemin = require("gulp-imagemin");
    pngquant = require('imagemin-pngquant');
    rename = require("gulp-rename");
    uglify = require("gulp-uglify");
    autoprefixer = require("autoprefixer");
    postcss = require('gulp-postcss');
    csscomb = require("gulp-csscomb");
    /*mmq = require('gulp-merge-media-queries');*/
    copy = require("gulp-copy");
    cssmin = require("gulp-cssmin");
    svgstore = require("gulp-svgstore");
    runSequence = require('run-sequence');
    imageminJpegRecompress = require('imagemin-jpeg-recompress');
    
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'))
  });

gulp.task('watch', function() {
  gulp.watch(['sass/**/*.scss', 'components/**/*.scss'], ['sass']);
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "external/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
})

gulp.task("style", function(){
  return gulp.src("css/common.css")
  .pipe(postcss([ 
    autoprefixer({ browsers: ["last 2 versions", "ie 10"] }) 
  ]))
  .pipe(csscomb())
  /*.pipe(mmq())*/
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest("../build/css"));
})

gulp.task("plugin-style", function(){
  return gulp.src("../build/external/**/*.css")
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest("../build/external"));
})

gulp.task("min-js", function(){
  return gulp.src("js/script.js")
  .pipe(uglify())
  .pipe(gulp.dest("../build/js"));
})

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
})

/*gulp.task('optimize', function () {
  return gulp.src('src/images/*')
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
});*/

gulp.task("min-svg", function(){
  return gulp.src("svg/*.svg")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("../build/svg"));
})

gulp.task("min-svg-sprite", function(){
  return gulp.src("svg-sprite/svg-src/*.svg")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("svg-sprite/svg-min/"));
})

gulp.task("svgstore", function(){
  return gulp.src("svg-sprite/svg-min/*.svg")
  .pipe(svgstore())
  .pipe(rename("svgsprite.svg"))
  .pipe(gulp.dest("svg-sprite/svg-sprite/"))
  
});

gulp.task('default', ['watch']);

gulp.task('build', function(callback) {
  runSequence("min-js", "style", "min-images", "min-svg", "copy", "plugin-style", callback);
});