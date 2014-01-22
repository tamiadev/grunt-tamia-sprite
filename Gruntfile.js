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
		sprite: {
			normal: {
				src: 'test/src/*.png',
				dest: 'test/tmp/normal/sprite.png'
			},
			retina: {
				src: 'test/src_retina/*.png',
				dest: 'test/tmp/retina/sprite.png'
			},
			params: {
				src: 'test/src/*.png',
				dest: 'test/tmp/params/sprite.png',
				destStyl: 'test/tmp/params/vars.styl',
				destJson: 'test/tmp/params/vars.json'
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
	grunt.registerTask('default', ['jshint', 'clean', 'sprite', 'test', 'clean']);
	grunt.registerTask('build', ['default']);

};
