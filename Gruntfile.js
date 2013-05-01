module.exports = function(grunt) {

	//	Project configuration
	grunt.initConfig({

		//	Read the package.json
		pkg: grunt.file.readJSON('package.json'),

		//	Metadata

		meta: {
			srcPath: 'sass/',
			deployPath: 'css/'
		},

		//	Task configuration
		sass: {
			dist: {
				files: {
					'<%= meta.deployPath %>style.css' : '<%= meta.srcPath %>style.scss'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		reload: {
			port: 6001,
			proxy: {
				host: 'localhost',
				port: 8000
			}
		},

		watch: {
			scripts: {
				files: [
					'<%= meta.srcPath %>*.scss'
				],
				tasks: ['sass', 'reload'],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask('default', ['watch']);
};