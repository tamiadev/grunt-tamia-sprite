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
	var crypto = require('crypto');
	var _ = require('lodash');
	var async = grunt.util.async;

	grunt.template.addDelimiters('tamia-sprite', '{%', '%}');

	grunt.registerMultiTask('sprite', 'Sprite generator for Tâmia', function() {
		this.requiresConfig([ this.name, this.target, 'src' ].join('.'));
		this.requiresConfig([ this.name, this.target, 'dest' ].join('.'));

		var allDone = this.async();
		var params = _.defaults(this.data, {
			target: this.target,
			engine: 'auto',
			algorithm: 'binary-tree',
			padding: 3,
			destStyl: this.data.dest.replace(/\.png$/, '.styl'),
			template: '{%=target%}_{%=name%} = {%=x%}px {%=y%}px {%=width%}px {%=height%}px',
			fingerprintTemplate: '{%=target%}_fingerprint = "{%=fingerprint%}"',
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

		var md5 = crypto.createHash('md5');
		var coordinates;
		async.parallel([
			function(done) {
				generateImage(_.extend({}, params, {
					src: files
				}), function(coords) {
					coordinates = coords;
					done();
				});
			},
			function(done) {
				generateImage(_.extend({}, params, {
					src: filesRetina,
					dest: params.dest.replace(/\.png$/, '@2x.png')
				}), done);
			}
		], function() {
			generateStylesheet(params, coordinates);
			allDone();
		});

		function generateImage(options, done) {
			if (!options.src.length) return done();

			spritesmith({
				src: options.src,
				engine: options.engine,
				algorithm: options.algorithm,
				padding: options.padding,
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
				md5.update(result.image);


				grunt.log.writeln('Sprite ' + options.dest.cyan + ' created.');

				done(result.coordinates);
			});
		}

		function generateStylesheet(options, coordinates) {
			// Generate Stylus variables
			var lines = _.map(coordinates, function(coords, filename) {
				var name = path.basename(filename, '.png');
				return grunt.template.process(options.template, {delimiters: 'tamia-sprite', data: {
					target: options.target,
					name: name,
					x: -coords.x,
					y: -coords.y,
					width: coords.width,
					height: coords.height
				}});
			});

			// Add fingerprint variable
			lines.push(grunt.template.process(options.fingerprintTemplate, {delimiters: 'tamia-sprite', data: {
				target: options.target,
				fingerprint: md5.digest('hex')
			}}));

			// Save variables
			grunt.file.write(options.destStyl, lines.join('\n'));

			grunt.log.writeln('Stylesheet ' + options.destStyl.cyan + ' created.');
		}

		function isRetina(name) {
			return name.indexOf('@2x') !== -1;
		}

		function isNotRetina(name) {
			return !isRetina(name);
		}
	});
};
