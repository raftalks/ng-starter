// Gulp Dependencies
var gulp 		= require('gulp');
var del 		= require('del');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var watch 		= require('gulp-watch');
var inject 		= require('gulp-inject');
var es 			= require('event-stream');
var less		= require('gulp-less');
var sourcemaps 	= require('gulp-sourcemaps');
var ngfilesort 	= require('gulp-angular-filesort');
var runsequence = require('run-sequence');
var html2js 	= require('gulp-html2js');
var cache		= require('gulp-cache');
var imagemin	= require('gulp-imagemin');
var minifyCSS	= require('gulp-minify-css');
var livereload 	= require('gulp-livereload');

// Set Build Config
var buildConfig = require('./config.build.js');


// clean files and folders in the build directory
gulp.task('clean:build', function(cb) {

	del(buildConfig.build_dir_files, cb);
});



// clean files and folders in the dist directory
gulp.task('clean:dist', function(cb) {

	del(buildConfig.dist_dir_files, cb);
});

// clean app files and folder in the build directory 
gulp.task('clean:buildapp', function(cb) {

	var app_path = [buildConfig.js_build_dir + '/app', buildConfig.js_build_dir + '/common'];
	del(app_path, cb);

});

gulp.task('clean:build_style_css', function(cb) {

	var css_path = buildConfig.js_build_dir + '/style.css';
	del(css_path, cb);

});

gulp.task('clean:build_vendor_css', function(cb) {

	var css_path = buildConfig.js_build_dir + '/vendor.css';
	del(css_path, cb);

});

// delete the vendor files in the build directory
gulp.task('clean:vendor', function(cb)
{
	var files = [buildConfig.js_build_dir + '/vendor.js', buildConfig.css_build_dir + '/vendor.css'];
	del(files, cb);
});


// build the app js files
gulp.task('build:app', ['clean:buildapp'], function(cb) {

	var stream = gulp.src(buildConfig.files.js.app, {base: "src"})
		.pipe(ngfilesort())
		.pipe(gulp.dest(buildConfig.js_build_dir));

	return stream;
});

// build the app css files
gulp.task('build:app_less', ['clean:build_style_css'], function(cb) {

	var app_css_1 = buildConfig.files.less.app;
	var app_css_2 = buildConfig.files.css.app;
	var files = app_css_1.concat(app_css_2);

	var stream = gulp.src(files)
		.pipe(sourcemaps.init())
			.pipe(concat('style.css'))
			.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.css_build_dir));

	return stream;
});

// build the vendor css files
gulp.task('build:vendor_less', ['clean:build_vendor_css'], function(cb) {
	var vendor_css_1 = buildConfig.files.less.vendor;
	var vendor_css_2 = buildConfig.files.css.vendor;
	var files = vendor_css_1.concat(vendor_css_2);

	var stream = gulp.src(files)
		.pipe(sourcemaps.init())
			.pipe(concat('vendor.css'))
			.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.css_build_dir));

	return stream;
});

// build the vendor file
gulp.task('build:vendor', ['clean:vendor'], function(cb) {

	var stream = gulp.src(buildConfig.files.js.vendor)
		.pipe(sourcemaps.init())
			.pipe(concat('vendor.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.js_build_dir));

	return stream;
});


// Create index page for build with all the assets loaded
gulp.task('index:build', function() {
	
	console.log('concat vendor files');
	// Concatenate vendor scripts
	var vendorStream = gulp.src(buildConfig.files.js.vendor)
		.pipe(sourcemaps.init())
			.pipe(concat('vendor.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.js_build_dir));

	console.log('loading all the app files');
	// app files
	var appSteam = gulp.src(buildConfig.files.js.app, {base: "src"})
		.pipe(ngfilesort())
		.pipe(gulp.dest(buildConfig.js_build_dir));

	console.log('preparing to inject the files to index.html');

	
	console.log('compiling less files');
	var app_css_1 = buildConfig.files.less.app;
	var app_css_2 = buildConfig.files.css.app;
	var app_files = app_css_1.concat(app_css_2);

	var lessFilesStream = gulp.src(app_files)
		.pipe(sourcemaps.init())
			.pipe(concat('style.css'))
			.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.css_build_dir));

	var vendor_css_1 = buildConfig.files.less.vendor;
	var vendor_css_2 = buildConfig.files.css.vendor;
	var vendor_files = vendor_css_1.concat(vendor_css_2);

	var vendorStreamLess = gulp.src(vendor_files)
		.pipe(sourcemaps.init())
			.pipe(concat('vendor.css'))
			.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(buildConfig.css_build_dir));

	var templatesStream = gulp.src([buildConfig.js_build_dir + '/app-templates.js', buildConfig.js_build_dir + '/common-templates.js']);

	return gulp.src(buildConfig.files.index)
		.pipe(inject(es.merge(vendorStreamLess, vendorStream), {relative: true, ignorePath: ['../build'], starttag: '<!-- inject:prior:{{ext}} -->'}))
		.pipe(inject(es.merge(lessFilesStream, appSteam, templatesStream), {relative: true, ignorePath: ['../build']}))
		.pipe(gulp.dest(buildConfig.build_dir));

});


// rebuild the index based on build files
gulp.task('index:rebuild', function() {
	
	var vendor_file = buildConfig.js_build_dir + '/vendor.js';
	var vendor_css_file = buildConfig.css_build_dir + '/vendor.css';
	var app_files = [buildConfig.js_build_dir + '/app/**/*.js', buildConfig.js_build_dir + '/common/**/*.js'];

	var source_app = gulp.src(app_files, {read: false}).pipe(ngfilesort());
	//var source_common = gulp.src(buildConfig.files.js.common, {read: false});
	var vendor_source = gulp.src(vendor_file, {read: false});
	var vendor_css = gulp.src(vendor_css_file, {read: false});
	var other_css_files = gulp.src([buildConfig.css_build_dir + '/**/*.css', '!'+vendor_css_file], {read: false});

	var templatesStream = gulp.src([buildConfig.js_build_dir + '/app-templates.js', buildConfig.js_build_dir + '/common-templates.js']);


	return gulp.src(buildConfig.files.index)
		.pipe(inject(es.merge(source_app, other_css_files, templatesStream), {relative: true, ignorePath: ['../build']}))
		.pipe(inject(es.merge(vendor_source, vendor_css), {relative: true, ignorePath: ['../build'], starttag: '<!-- inject:prior:{{ext}} -->'}))
		.pipe(gulp.dest(buildConfig.build_dir));

});


gulp.task('build:compile', ['clean:dist'], function()
{
	var vendor_js = [buildConfig.js_build_dir + '/vendor.js'];
	var vendor_css = [buildConfig.css_build_dir + '/vendor.css'];
	var app_css = [buildConfig.css_build_dir + '/style.css'];
	var app_files = [buildConfig.js_build_dir + '/app/**/*.js', buildConfig.js_build_dir + '/common/**/*.js'];
	var templates = [buildConfig.js_build_dir + '/app-templates.js', buildConfig.js_build_dir + '/common-templates.js'];
	var images = buildConfig.img_build_dir + '/**/*';

	var all_js_files = vendor_js.concat(templates, app_files);
	var all_css_files = vendor_css.concat(app_css);

	//concat and compile all the js files
	var jsfilesStream = gulp.src(all_js_files)
		.pipe(ngfilesort())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(buildConfig.js_dist_dir));

	//concat and minify all css stylesheets
	var	cssfilesStream = gulp.src(all_css_files)
		.pipe(concat('styles.css'))
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(gulp.dest(buildConfig.css_dist_dir));

	//copy images folder to dist
	gulp.src(images).pipe(gulp.dest(buildConfig.img_dist_dir));

	//compile the index page
	var indexStream = gulp.src(buildConfig.files.index)
		.pipe(inject(es.merge(jsfilesStream, cssfilesStream), {relative: true, ignorePath: ['../dist']}))
		.pipe(gulp.dest(buildConfig.dist_dir));
});



//compile angularjs app templates
gulp.task('template:app', function(cb) {
	console.log('compiling app templates ');
	return gulp.src(buildConfig.files.templates.app)
	.pipe(html2js({
		outputModuleName: 'app-templates',
		base: 'src',
		useStrict: true
	}))
	.pipe(concat('app-templates.js'))
	.pipe(gulp.dest(buildConfig.js_build_dir));
});


//compile angularjs common templates
gulp.task('template:common', function(cb) {

	console.log('compiling template common');
	return gulp.src(buildConfig.files.templates.common)
	.pipe(html2js({
		outputModuleName: 'common-templates',
		base: 'src',
		useStrict: true
	}))
	.pipe(concat('common-templates.js'))
	.pipe(gulp.dest(buildConfig.js_build_dir));
});


//compress images
gulp.task('images:build', function(cb) {

	return gulp.src(buildConfig.files.img.all)
	.pipe(cache(imagemin({
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	})))
	.pipe(gulp.dest(buildConfig.img_build_dir));
});

//create watch for changes in source dir
gulp.task('watch:files', function(cb) {

	// Create LiveReload server
	livereload.listen();

    gulp.watch(buildConfig.files.js.app, function(evt) {

    	runsequence('build:app', 'index:rebuild');
    });

    gulp.watch('config.build.js', function(evt)
    	{
    		delete require.cache[require.resolve('./config.build.js')]
    		buildConfig = require('./config.build.js');
    		runsequence('index:build');
    	});

    gulp.watch(buildConfig.files.index, ['index:rebuild']);

    gulp.watch([buildConfig.files.less.app, buildConfig.files.css.app], function(evt) {
    	runsequence('build:app_less', 'index:rebuild');
    });

    gulp.watch([buildConfig.files.less.vendor, buildConfig.files.css.vendor], function(evt) {
    	runsequence('build:vendor_less', 'index:rebuild');
    });

    gulp.watch(buildConfig.files.templates.app, function(evt) {
    	runsequence('template:app', 'index:rebuild');
    });
   
    gulp.watch(buildConfig.files.templates.common, function(evt) {
    	runsequence('template:common', 'index:rebuild');
    });

    // Watch any files in build/, reload on change
    gulp.watch(buildConfig.build_dir+'/**').on('change', livereload.changed);

});



gulp.task('build', function(cb) {
	
	runsequence('clean:build',['template:app', 'template:common', 'images:build'], 'index:build', cb);
	console.log('build task completed.');
});



gulp.task('watch', function(cb) {

	runsequence('build', 'watch:files', cb);
});



gulp.task('compile', function(cb) {
	runsequence('build','build:compile', cb);
	console.log('compiling completed');
});



gulp.task('test', function(cb) {
	//pending work
	console.log('Tests are pending...');
});


gulp.task('default', ['watch']);
