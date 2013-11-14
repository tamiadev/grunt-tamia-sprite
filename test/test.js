'use strict';
/*global describe:false, it:false*/

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');

describe('grunt-tamia-sprite', function() {
	describe('normal', function() {
		it('Should create sprite file.', function() {
			assert.ok(fs.existsSync('test/tmp/normal/sprite.png'), 'Sprite file created.');
			assert.ok(fs.statSync('test/tmp/normal/sprite.png').size, 'Sprite file not empty.');
		});
		it('Should create Stylus file.', function() {
			assert.ok(fs.existsSync('test/tmp/normal/sprite.styl'), 'Stylus file created.');
		});
		it('Stylus file content is OK.', function() {
			var stylus = grunt.file.read('test/tmp/normal/sprite.styl');
			var lines = stylus.split('\n');
			var fingerprint = lines.pop();
			var images = lines.join('\n');
			assert.ok(/normal_fingerprint = "\d{13}"/.test(fingerprint), 'Fingerprint is OK.');
			assert.equal(images, grunt.file.read('test/expected/normal.styl'), 'Images are OK.');
		});
	});

	describe('retina', function(test) {
		it('Should create normal sprite file.', function() {
			assert.ok(fs.existsSync('test/tmp/retina/sprite.png'), 'Sprite file created.');
			assert.ok(fs.statSync('test/tmp/retina/sprite.png').size, 'Sprite file not empty.');
		});
		it('Should create @2x sprite file.', function() {
			assert.ok(fs.existsSync('test/tmp/retina/sprite@2x.png'), 'Retina sprite file created.');
			assert.ok(fs.statSync('test/tmp/retina/sprite@2x.png').size, 'Retina sprite file not empty.');
		});
		it('Should create Stylus file.', function() {
			assert.ok(fs.existsSync('test/tmp/retina/sprite.styl'), 'Stylus file created.');
		});
		it('Stylus file content is OK.', function() {
			var stylus = grunt.file.read('test/tmp/retina/sprite.styl');
			var lines = stylus.split('\n');
			var fingerprint = lines.pop();
			var images = lines.join('\n');
			assert.ok(/retina_fingerprint = "\d{13}"/.test(fingerprint), 'Fingerprint is OK.');
			assert.equal(images, grunt.file.read('test/expected/retina.styl'), 'Images are OK.');
		});
	});

	describe('params', function(test) {
		it('Should create normal sprite file.', function() {
			assert.ok(fs.existsSync('test/tmp/params/sprite.png'), 'Sprite file created.');
			assert.ok(fs.statSync('test/tmp/params/sprite.png').size, 'Sprite file not empty.');
		});
		it('Should create Stylus file.', function() {
			assert.ok(fs.existsSync('test/tmp/params/vars.styl'), 'Stylus file created.');
		});
	});
});
