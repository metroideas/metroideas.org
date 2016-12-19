/**
 * People I stole from:
 * 
 * https://gist.github.com/agragregra/79be7c57271c81258a51
 * http://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html
 * https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/
 */

var gulp = require('gulp'),
    cp = require('child_process'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

// Source and destination paths
var paths = {
  sass:   './_public/_sass/**/*.scss',
  css:    './_public/css',
  jekyll: [
    '_public/css/**/*.css',
    '_public/*.html',
    '_layouts/**/*.html',
    '_includes/**/*.html',
    '*.md',
    '*.markdown'
  ]
};

// Clean
gulp.task('clean', function() {
  return del([
    'Gemfile.lock',
    '_site/',
    '_public/css'

  ]);
})

// Installs gem bundle 
gulp.task('install:gems', function(done) {
  return cp.spawn('bundle', ['install'], {stdio: 'inherit'})
    .on('close', done);
})

// Install all dependencies
gulp.task('install', ['install:gems']);

// Build Jekyll _site/
gulp.task('build:jekyll', function(done) {
  browserSync.notify('Building Jekyll');
  return cp.spawn('bundle', ['exec','jekyll','build','--config=_config.yml'],
    {stdio: 'inherit'}).on('close', done);
})

// Rebuild Jekyll site and reload page
gulp.task('jekyll-rebuild', ['build:jekyll'], function() {
  browserSync.reload();
})

// All build tasks
gulp.task('build', ['build:jekyll'])

// Compile sass to minified css files
gulp.task('sass', function() {
  browserSync.notify('Compiling stylesheet')
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

// Watch for changes 
gulp.task('watch', function() {
  // js

  // sass
  gulp.watch(paths.sass, ['sass'])
  
  // html and markdown
  gulp.watch([paths.jekyll], ['jekyll-rebuild']);
});

// BrowserSync
gulp.task('browser-sync', ['build:jekyll'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    host: 'localhost'
  });
});

// Serve local _site/
gulp.task('serve', function() {
  runSequence('clean', 'install', 'sass', ['browser-sync', 'watch'])
});

// Default runs clean, installs dependencies, builds local site
gulp.task('default', function(done) {
  runSequence('clean', 'install', 'build', done);
});

