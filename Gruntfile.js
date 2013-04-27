module.exports = function( grunt ) {

	grunt.initConfig({

		// Read the package.json file
		pkg : grunt.file.readJSON( 'package.json' ),

		// SASS and JS directories
		css_src_path	: '/_sass',
		css_build_path	: '/css',
		js_src_path		: '/_js',
		js_build_path		: '/js',

		concat : {
			options : { separator : ';\n' },
		},

		// uglify {
		// 	options : {
		// 		mangle: true
		// 	},
		// },

		// Compile SASS
		sass : {
			dist : {
				options : { style: 'compressed' },
				files : {
					'<%= css_build_path %>/style.css' : '<%= css_src_path %>/style.sass'
				}
			}
		},

		watch : {
			// Watch the files
			dist : {
				files: [
					'<%= css_src_path %>/*'
				],

				tasks : [ 'concat', 'sass', 'notify:notify_default' ]
			},

			wjs : {
				files : [ '<%= js_src_path %>/**/*' ],
				tasks : [ 'concat', 'notify:wjs' ]
			},

			wcss : {
				files : [ '<%= css_src_path %>/**/*' ],
				tasks : [ 'sass', 'notify:wcss' ]
			}
		},

		notify : {
			notify_default : {
				options : {
					title : '<%= pkg.title %>',
					message : 'Compilação finalizada!'
				}
			},

			wcss : {
				options : {
					title : 'SASS - <%= pkg.title %>',
					message : 'Compilado e minificado!'
				}
			},

			wjs : {
				options : {
					title : 'Javascript - <%= pkg.title %>',
					message : 'JS Pronto!'
				}
				}
		}
	});

	// Plugins
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-notify' );

	grunt.registerTask( 'default', [ 'concat', 'sass', 'notify:notify_default' ] );

	// Tasks for Watch
	grunt.registerTask( 'w', [ 'watch:dist' ] );
	grunt.registerTask( 'wjs', [ 'watch:wjs' ] );
	grunt.registerTask( 'wcss', [ 'watch:wcss' ] );
};