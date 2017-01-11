/**
 *
 * CONFIGURATION
 *
 **/
var gulp = require('gulp'),
    cp = require('child_process'),
    del = require('del')
    fs = require('fs'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    argv = require('yargs').argv;

/**
 *
 * Sets global Jekyll build environment via command line ARGV
 * Defaults to JEKYLL_ENV=development
 * See `build` and `serve` tasks
 *
 **/
var jekyllEnv = function() {
  if (argv.production) {
    return 'production';
  } else if (argv.debug) {
    return 'debug';
  } else {
    return 'development';
  }
}();

// Source and destination paths for generating assets
var paths = {
  sass:   './assets/_sass/**/*.scss',
  // js:     './assets/_js/**/*.js', // PENDING
  css:    './css',
  jekyll: './_site'
}

// Paths being watched
var watch = {
  // sass
  sass: paths.sass,
  
  // PENDING js
  // js: paths.js,
  
  // Jekyll
  jekyll: [
    './**/*',
    '!./*', // Exclude standalone files in root dir
    './_config*yml', // Rebuild on _config.yml change? Oh, hell yes.
    '!./node_modules/**/*', // Exclude node_modules
    '!./assets/**/*', // Exclude assets dir watched by other tasks
    '!./_site/**/*' // Exclude _site build
  ]
};

/**
 *
 * PRIMARY TASKS
 *
 **/

/**
 *
 * `gulp`
 * Default task installs rubygem dependencies, compiles assets and builds _site/
 *
 **/
gulp.task('default', function(done) {
  runSequence('clean', 'install', 'sass', 'build-jekyll', done);
});

/**
 *
 * `gulp build`
 * Builds _site directory
 * 
 * Set JEKYLL_ENV
 * --development (default) 
 * --production
 * --debug
 * 
 * Remove dependencies and assets, then recompile
 * --clean 
 *
 **/
 gulp.task('build', function(done) {
  if (argv.clean) {
    runSequence('clean', 'install', 'sass', 'build-jekyll', done);
  } else {
    runSequence('build-jekyll', done);    
  }
 })

/**
 *
 * `gulp serve`
 * Builds and serves _site directory
 * 
 * See `gulp build` for command line options
 *
 **/
gulp.task('serve', function(done) {
  runSequence('browser-sync', 'watch', done)
});

/**
 *
 * `gulp netlify`
 * 
 * Compiles assets
 * Sets JEKYLL_ENV=production
 * Builds _site/ directory
 *
 * Note: Netlify automatically installs package.json and Gemfile dependencies
 **/
gulp.task('netlify', function(done) {
  jekyllEnv = 'production';
  runSequence('sass', 'build-jekyll', done);
})

/**
 *
 * SECONDARY TASKS
 * 
 **/

// Generates Jekyll _site directory
gulp.task('build-jekyll', function(done) {
  var env = jekyllEnv;

  if (env != 'production') {
    browserSync.notify('Building jekyll:' + env);
  }

  // command run by cp.exec()
  var command = function() {
    return {
      development: 'JEKYLL_ENV=development bundle exec jekyll build --config=_config.yml --future --unpublished --drafts',
      production: 'JEKYLL_ENV=production bundle exec jekyll build --config=_config.yml',
      debug: 'JEKYLL_ENV=debug bundle exec jekyll build --config=_config.yml --verbose --profile --future --unpublished --drafts'
    }[env];
  }();

  var opts = {
    development: {},
    production: {},
    debug: {maxBuffer: 1024 * 500}
  }[env]

  opts.stdio = [0, 'pipe', fs.openSync('jekyll-build-error.log', 'w')]
  
  return cp.exec(command, opts).on('close', done)
    .stdout.pipe(process.stdout);
})

// Rebuild Jekyll site and reload page
gulp.task('rebuild-jekyll', ['build-jekyll'], function() {
  browserSync.reload();
})

// Compile sass to minified & mapped css files
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
  gulp.watch(watch.sass, ['sass'])
  
  // html and markdown
  gulp.watch(watch.jekyll, ['rebuild-jekyll']);
});

// Serve generated _site with BrowserSync
gulp.task('browser-sync', ['build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    host: 'localhost'
  });
});

// Deletes build files, _site dir and compiled css
gulp.task('clean', function() {
  return del([
    './.jekyll-metadata',
    './Gemfile.lock',
    paths.jekyll,
    paths.css
  ]);
})

// Bundle install Gemfile 
gulp.task('install', function(done) {
  return cp.spawn('bundle', ['install'], {stdio: 'inherit'})
    .on('close', done);
})

/**
 *
 * REFERENCES (aka people I stole from)
 *
 * https://gist.github.com/agragregra/79be7c57271c81258a51
 * http://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html
 * https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/
 *
 **/
