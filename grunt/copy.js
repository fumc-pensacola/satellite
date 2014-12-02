module.exports = {
	// Copy bootstrap fonts
	semantic: {
		files: [{
			expand: true,
			cwd: 'bower_components/semantic-ui/dist/themes/default/assets',
			src: ['fonts/**', 'images/**'],
			dest: 'tmp/assets/css/themes/default/assets'
		}]
	},

	css: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['assets/css/**/*.css'],
			dest: 'tmp/'
		}]
	},

	dev: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['**/*'],
			dest: 'tmp/'
		}, {
			expand: true,
			cwd: './',
			src: ['bower_components/**'],
			dest: 'tmp/'
		}]
	},

	dist: {
		files: [{
			expand: true,
			cwd: 'tmp/',
			src: ['index.html', 'assets/css/themes/default/assets/**'],
			dest: 'dist/'
		}]
	},

	index: {
		files: {
			'tmp/index.html': 'app/index.html'
		}
	}
};
