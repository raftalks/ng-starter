module.exports = {

	build_dir: './build',
	js_build_dir: './build/js',
	css_build_dir: './build/css',
	img_build_dir: './build/images',
	build_dir_files: './build/**/*',

	dist_dir: './dist',
	js_dist_dir: './dist/js',
	css_dist_dir: './dist/css',
	img_dist_dir: './dist/images',
	dist_dir_files: './dist/**/*',



	files: {

		index: 'src/index.html',

		js: {

			vendor: [
				'vendor/jquery/dist/jquery.js',
				'vendor/angular/angular.js',
				'vendor/angular-resource/angular-resource.js',
				'vendor/angular-ui-router/release/angular-ui-router.js',
				'vendor/modernizr/modernizr.js'
			],

			app: [
				'src/common/**/*.js',
				'!src/common/**/*.spec.js',
				'src/app/**/*.js',
				'!src/app/**/*.spec.js'
			]
		},

		less: {

			vendor: [
				'vendor/bootstrap/less/bootstrap.less'
			],

			app: ['src/less/**/*.less', 'src/common/**/*.less', 'src/app/**/*.less']
		},

		css : {

			vendor: [],

			app:['src/less/**/*.css', 'src/common/**/*.css', 'src/app/**/*.css']
		},

		img: {
			all: ['src/images/**/*']
		},

		templates: {
			app: ['src/app/**/*.tpl.html'],
			common: ['src/common/**/*.tpl.html']
		}
	}
}