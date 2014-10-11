module.exports = {

	build_dir: './build',
	js_build_dir: './build/js',
	css_build_dir: './build/css',
	assets_build_dir: './build/assets',
	img_build_dir: './build/assets/images',
	build_dir_files: './build/**/*',

	dist_dir: './dist',
	js_dist_dir: './dist/js',
	css_dist_dir: './dist/css',
	assets_dist_dir: './build/assets',
	img_dist_dir: './dist/assets/images',
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
				'./src/less/vendor.less'
			],

			app: ['src/less/**/*.less', 'src/common/**/*.less', './src/app/**/*.less', '!./src/less/vendor.less']
		},

		css : {

			vendor: [],

			app:['src/less/**/*.css', 'src/common/**/*.css', './src/app/**/*.css']
		},

		img: {
			all: ['src/images/**/*']
		},

		assets: {
			vendor: ['./vendor/bootstrap/fonts/**/*', './vendor/font-awesome/fonts/**/*']
		},

		templates: {
			app: ['src/app/**/*.tpl.html'],
			common: ['src/common/**/*.tpl.html']
		}
	}
}