module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	grunt.loadTasks('tasks');

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: [
				'tasks/sprite.js',
				'Gruntfile.js'
			]
		},
		jscs: {
			all: [
				'tasks/*.js'
			],
		},
		sprite: {
			options: {
				destStyl: 'test/tmp/taskOptions/custom.styl'
			},
			normal: {
				src: 'test/src/*.png',
				dest: 'test/tmp/normal/sprite.png',
				options: {
					destStyl: 'test/tmp/normal/sprite.styl'
				}
			},
			retina: {
				src: 'test/src_retina/*.png',
				dest: 'test/tmp/retina/sprite.png',
				options: {
					destStyl: 'test/tmp/retina/sprite.styl'
				}
			},
			params: {
				src: 'test/src/*.png',
				dest: 'test/tmp/params/sprite.png',
				destStyl: 'test/tmp/params/vars.styl',
				destJson: 'test/tmp/params/vars.json'
			},
			taskOptions: {
				src: 'test/src/*.png',
				dest: 'test/tmp/taskOptions/sprite.png'
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']
			}
		},
		clean: ['test/tmp']
	});

	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['jshint', 'jscs', 'clean', 'sprite', 'test', 'clean']);
	grunt.registerTask('build', ['default']);

};
