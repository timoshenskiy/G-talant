const gulp = require("gulp");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
}

exports.default = gulp.series(
  server, watcher
);
