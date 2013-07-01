module.exports = function(grunt) {
	'use strict';

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
				destStyl: 'test/tmp/params/vars.styl'
			}
		},
		nodeunit: {
			tasks: ['test/*_test.js']
		},
		clean: ['test/tmp']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['jshint', 'clean', 'sprite', 'nodeunit', 'clean']);
	grunt.registerTask('build', ['clean']);

};
