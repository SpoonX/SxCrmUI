var gulp      = require('gulp'),
    clean     = require('gulp-clean'),
    less      = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    minifyJS  = require('gulp-uglify'),
    run       = require('run-sequence'),
    Useuses   = require('useuses'),
    useuses,
    options;

//styles
gulp.task('styleDeps', function (cb) {
  options = {
    in     : 'src/styles/main.less',
    out    : 'build/styles/main.less',
    verbose: false,
    search : ['../bower_components'],
    aliases: {
              bootstrap : '../bower_components/bootstrap/less/mixins'
             },
    dryRun : false //turn the option off but still visible if needed
  };

  useuses = new Useuses(options);

  useuses.compile(function (err, assembled) {
    if (err) {
      return cb(err);
    }
    return cb();
  });
});

gulp.task('style', function () {
  return gulp.src('build/styles/main.less')
              .pipe(less())
              .pipe(minifyCSS())
              .pipe(gulp.dest('build/styles'));
});

gulp.task('styleClean', function (cb) {
  return gulp.src('build/styles/main.less', {read: false})
              .pipe(clean());
});

gulp.task('styleProcess', function (cb){
  return run('scriptDeps', 'style', 'styleClean', cb);
});

//scripts
gulp.task('scriptDeps', function (cb) {
  options = {
    in     : 'src/scripts/main.js',
    out    : 'build/scripts/main.js',
    verbose: false,
    search : ['bower_components'],
    dryRun : false //turn the option off but still visible if needed
  };

  useuses = new Useuses(options);

  useuses.compile(function (err, assembled) {
    if (err) {
      return cb(err);
    }
    return cb();
  });
});

gulp.task('script', function (cb) {
  return gulp.src('build/scripts/main.js')
              .pipe(minifyJS())
              .pipe(gulp.dest('build/scripts'));
});

gulp.task('scriptProcess', function (cb) {
  return run('scriptDeps', 'script', cb)
});

//default
gulp.task('default', function (cb) {
  return run(['scriptProcess', 'styleProcess'], cb);
});
