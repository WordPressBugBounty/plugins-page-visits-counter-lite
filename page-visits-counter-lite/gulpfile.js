var gulp = require('gulp'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		plumber = require('gulp-plumber'),
		concat = require('gulp-concat'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync').create(),
		sourceMap = require('gulp-sourcemaps'),
		babel = require('gulp-babel');




// ======== FRONTEND/PUBLIC START ========


// FRONTEND - AJAX
gulp.task('frontend-ajax', function() {
	gulp.src([
		'src/frontend/ajax/page-visits-counter-lite-ajax.js', // Write paths to js files
		])
	.pipe(plumber())
	.pipe(concat('page-visits-counter-lite-ajax.js'))
	.pipe(babel({
			presets: ['es2015']
		}))
	// .pipe(uglify())
	.pipe(gulp.dest('assets/frontend'));
	//.pipe(browserSync.stream())
});




// ======== FRONTEND/PUBLIC END ========

// ======== ADMIN START ========




// ADMIN - SASS
gulp.task('admin-sass', function() {
	gulp.src('src/admin/sass/page-visits-counter-lite.sass')
	//.pipe(sourceMap.init())
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 30 versions']}))
	// .pipe(sass({outputStyle: 'compressed'})) //compressed, expanded
	.pipe(sass({outputStyle: 'expanded'})) //compressed, expanded
	//.pipe(sourceMap.write('.'))
	.pipe(gulp.dest('assets/admin'));
	//.pipe(browserSync.stream());
});




// ADMIN - SCRITPS - JS
gulp.task('admin-scripts', function() {
	gulp.src([
		'src/admin/js/0001-observer.js', // Write paths to js files
		'src/admin/js/0010-functions-glob/0001-module-start.js',

			// FUNCTIONS-GLOBAL
			'src/admin/js/0010-functions-glob/0010-stripHTMLtags.js',
			'src/admin/js/0010-functions-glob/0020-countOccurances.js',


		'src/admin/js/0010-functions-glob/1000-module-reveal-end.js',
		'src/admin/js/0100-app-start.js',

			// DEACTIVATE PLUGIN - POPUP MESSAGE
			'src/admin/js/0110-deactivate-popup-msg.js',

			// FILTER MENU
			'src/admin/js/0120-dashboard-widget/0001-filter-menu/0010-build-filter-menu.js',
			'src/admin/js/0120-dashboard-widget/0001-filter-menu/0020-toggle-menu.js',
			'src/admin/js/0120-dashboard-widget/0001-filter-menu/0030-filter-reports.js',
			'src/admin/js/0120-dashboard-widget/0001-filter-menu/0040-options-filtered-notific.js',
			'src/admin/js/0120-dashboard-widget/0001-filter-menu/0050-delete-filter-option.js',


			// RESET MENU
			'src/admin/js/0120-dashboard-widget/0005-reset-menu/0010-build-reset-menu.js',
			'src/admin/js/0120-dashboard-widget/0005-reset-menu/0020-toggle-menu.js',
			'src/admin/js/0120-dashboard-widget/0005-reset-menu/0030-delete-reset-option.js',


			// OTHER
			'src/admin/js/0120-dashboard-widget/0010-edit-total-visits.js',
			'src/admin/js/0120-dashboard-widget/0020-quick-info.js',
			'src/admin/js/0120-dashboard-widget/0030-reset-response-boxes.js',
			'src/admin/js/0120-dashboard-widget/0040-recalc-total-page-nr.js',


			//OPTIONS MENU
				// SORT OPTION
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0010-sort.js',
				// SELECT OPTION
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0010-select-toggle.js',
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0020-enable-icons.js',
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0030-select-all-toggle.js',
					// Select by page type
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0010-toggle-menu.js',
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0020-build-menu.js',
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0030-delete-option.js',
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0040-selecting-by-type.js',
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0050-selecting-by-type-update.js',
					'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0040-select-by-type-menu/0060-count-visible-reports.js',

				'src/admin/js/0120-dashboard-widget/0050-options-menu/0020-select-option/0050-select-report.js',


				// TOGGLE HIDDEN REPORTS - eye icon/s
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0030-toggle-hidden-reports.js',
				// SEARCH OPTION
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0040-search/search-toggle.js',
				'src/admin/js/0120-dashboard-widget/0050-options-menu/0040-search/search-filter.js',

			// MENU OPERATIONS
			'src/admin/js/0120-dashboard-widget/0500-menu-operations/0010-close-other-menus.js',
			'src/admin/js/0120-dashboard-widget/0500-menu-operations/0020-build-menus-page-type-options.js',
			'src/admin/js/0120-dashboard-widget/0500-menu-operations/0030-last-page-type-option-deleted.js',
			'src/admin/js/0120-dashboard-widget/0500-menu-operations/0040-is-everything-deleted-in-list-type.js',


			// SETTINGS PAGE
			'src/admin/js/0130-settings-page/0010-counter-tab.js',


			// COMPONENTS
			'src/admin/js/0800-components/0010-light-tabs.js',
			'src/admin/js/0800-components/0020-accordion-menu.js',


		'src/admin/js/1000-app-end.js'
		])
	.pipe(plumber())
	.pipe(concat('page-visits-counter-lite.js'))
	.pipe(babel({
			presets: ['es2015']
		}))
	// .pipe(uglify())
	.pipe(gulp.dest('assets/admin'));
	//.pipe(browserSync.stream())
});




// ADMIN - AJAX
gulp.task('admin-ajax', function() {
	gulp.src([
		'src/admin/ajax/0001-app-start.js', // Write paths to js files

			// DASHBOARD WIDGET
			'src/admin/ajax/0010-dashboard-widget/update-total-visits-nr.js',

				// LIST ROW
				'src/admin/ajax/0010-dashboard-widget/list-row/delete-page.js',
				'src/admin/ajax/0010-dashboard-widget/list-row/update-page-visits-nr.js',

				// QUICK-RESET
				'src/admin/ajax/0010-dashboard-widget/quick-reset/reset-all.js',
				'src/admin/ajax/0010-dashboard-widget/quick-reset/reset-page-type.js',

				// SELECT-MENU
				'src/admin/ajax/0010-dashboard-widget/select-menu/0010-base.js',
				'src/admin/ajax/0010-dashboard-widget/select-menu/0020-set-as-visible.js',
				'src/admin/ajax/0010-dashboard-widget/select-menu/0030-set-as-hidden.js',
				'src/admin/ajax/0010-dashboard-widget/select-menu/0040-reset.js',
				'src/admin/ajax/0010-dashboard-widget/select-menu/0050-delete.js',

			// SETTINGS PAGE
			'src/admin/ajax/0020-settings-form.js',

		'src/admin/ajax/1000-app-end.js'
		])
	.pipe(plumber())
	.pipe(concat('page-visits-counter-lite-ajax.js'))
	.pipe(babel({
			presets: ['es2015']
		}))
	// .pipe(uglify())
	.pipe(gulp.dest('assets/admin'));
	//.pipe(browserSync.stream())
});


// ======== ADMIN END ========





// PHP
gulp.task('php', function() {
	gulp.src('./**/*.php');
	//.pipe(browserSync.stream())
});




// Server
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost"     // Enter path to your project on local host -  without http://
	});
});




// Image Task - Compress
gulp.task('images', function() {
	return gulp.src('assets/images-uncompressed/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/images'));
});




gulp.task('watch', function() {
	gulp.watch('./**/*.php', ['php']);
	gulp.watch('src/frontend/ajax/**', ['frontend-ajax']);
	gulp.watch('src/admin/sass/**', ['admin-sass']);
	gulp.watch('src/admin/js/**', ['admin-scripts']);
	gulp.watch('src/admin/ajax/**', ['admin-ajax']);
	//gulp.watch('src/images-uncompressed/*', ['images']);
});




//gulp.task('default', ['sass', 'scripts', 'ajax', 'php', 'browser-sync', 'watch']);
gulp.task('default', ['frontend-ajax', 'admin-sass', 'admin-scripts', 'admin-ajax', 'php', 'watch']);
