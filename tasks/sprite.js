/**
 * Sprite generator for Tâmia
 *
 * @requires GraphicsMagick or Cairo
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var spritesmith = require('spritesmith');
	var _ = grunt.util._;
	var async = grunt.util.async;

	grunt.registerMultiTask('sprite', 'Sprite generator for Tâmia', function() {
		this.requiresConfig([ this.name, this.target, 'src' ].join('.'));
		this.requiresConfig([ this.name, this.target, 'dest' ].join('.'));

		var allDone = this.async();
		var params = _.defaults(this.data, {
			engine: 'auto',
			algorithm: 'top-down',
			destStyl: this.data.dest.replace(/\.png$/, '.styl')
		});

		var files = this.filesSrc;
		if (!files.length) {
			grunt.warn('Source files not found.');
			allDone();
		}

		// Separate retina files
		var filesRetina = _.filter(files, isRetina);
		files = _.filter(files, isNotRetina);

		if (filesRetina.length && filesRetina.length !== files.length) {
			grunt.warn('Number of normal and Retina images should be equal.');
			allDone();
		}

		async.parallel([
			function(done) {
				generate(_.extend({}, params, {
					src: files
				}), done);
			},
			function(done) {
				generate(_.extend({}, params, {
					src: filesRetina,
					dest: params.dest.replace(/\.png$/, '@2x.png'),
					skipStyl: true
				}), done);
			}
		], allDone);
	});

	function generate(options, done) {
		if (!options.src.length) return done();

		spritesmith({
			src: options.src,
			engine: options.engine,
			algorithm: options.algorithm,
			exportOpts: {
				format: 'png'
			}
		}, function (err, result) {
			if (err) {
				grunt.fatal(err);
				return done();
			}

			// Save sprite image
			grunt.file.mkdir(path.dirname(options.dest));
			fs.writeFileSync(options.dest, result.image, 'binary');

			grunt.log.writeln('File "' + options.dest + '" created.');

			if (!options.skipStyl) {
				// Generate Stylus variables
				var lines = _.map(result.coordinates, function(coords, filename) {
					var name = path.basename(filename, '.png');
					return ['sprite_' + name, '=', -coords.x + 'px', -coords.y + 'px', coords.width + 'px', coords.height + 'px'].join(' ');
				});

				// Save variables
				grunt.file.write(options.destStyl, lines.join('\n'));

				grunt.log.writeln('File "' + options.destStyl + '" created.');
			}

			done();
		});
	}

	function isRetina(name) {
		return name.indexOf('@2x') !== -1;
	}

	function isNotRetina(name) {
		return !isRetina(name);
	}
};
