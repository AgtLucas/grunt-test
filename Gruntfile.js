"use strict";

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

		regarde: {
			css: {
				files: '<%= meta.srcPath %>*.scss',
				tasks: ['sass'],
				events: true
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask('default', ['regarde']);
};