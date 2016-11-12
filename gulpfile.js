var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    concat = require('gulp-concat');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    cssSources,
    htmlSources,
    phpSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'resources/';
  sassStyle = 'expanded';
} else {
  outputDir = 'public/';
  sassStyle = 'compressed';
}


coffeeSources = ['resources/coffee/tagline.coffee'];
jsSources = [
  // 'components/scripts/rclick.js',
  // 'components/scripts/pixgrid.js',
  'resources/scripts/tagline.js',
  'resources/scripts/template.js'
];
sassSources = ['resources/assets/sass/app.scss'];
cssSources = ['resources/css/*.css'];
//htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
    .on('error', gutil.log))
    .pipe(gulp.dest('resources/scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'resources/assets/sass',
      // image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulpif(env === 'production', minifyCSS()))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('css', function(){
  gulp.src(cssSources)
  .pipe(gulpif(env === 'production', minifyCSS()))
  .pipe(gulp.dest(outputDir + 'css'))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('resources/assets/sass/*.scss', ['compass']);
  gulp.watch(cssSources, ['css']);
  gulp.watch('resources/views/*.blade.php', ['php']);
  // gulp.watch('builds/development/js/*.json', ['json']);
  gulp.watch('resources/images/**/*.*', ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('php', function(){
  gulp.src('resources/views/*.blade.php')
  .pipe(connect.reload({stream:true}))
});

// gulp.task('html', function() {
//   gulp.src('builds/development/*.html')
//     .pipe(gulpif(env === 'production', minifyHTML()))
//     .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
//     .pipe(connect.reload())
// });
//
gulp.task('images', function(){
  gulp.src('resources/images/**/*.*')
  .pipe(gulpif(env === 'production', imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngcrush()]
  })))
  .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
  .pipe(connect.reload())
});

// gulp.task('json', function() {
//   gulp.src('builds/development/js/*.json')
//     .pipe(gulpif(env === 'production', jsonminify()))
//     .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
//     .pipe(connect.reload())
// });

gulp.task('default', ['php', 'coffee', 'js', 'compass', 'images', 'css', 'connect', 'watch']);
