/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');

browserSync.init({
	server: './'
});
browserSync.stream();

gulp.task('styles', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('lint', () => {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

gulp.task('imageMin', () =>  // optomizes files (not very optomized IMO??
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./img'))
);

gulp.task('default', function() {
	gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('*.html', browserSync.reload); 
	gulp.watch('js/*.js', gulp.series('lint', browserSync.reload)); 
	gulp.watch('src/images/*', gulp.series('imageMin'));
});	

