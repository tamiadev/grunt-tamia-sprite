var fs = require('fs'),
	grunt = require('grunt');

exports.sprite = {
	normal: function(test) {
		'use strict';

		test.ok(fs.existsSync('test/tmp/normal/sprite.png'), 'Sprite file created.');
		test.ok(fs.statSync('test/tmp/normal/sprite.png').size, 'Sprite file not empty.');

		test.ok(fs.existsSync('test/tmp/normal/sprite.styl'), 'Stylus file created.');
		test.equal(grunt.file.read('test/tmp/normal/sprite.styl'), grunt.file.read('test/expected/normal.styl'), 'Stylus file content is OK.');

		test.done();
	},
	retina: function(test) {
		'use strict';

		test.ok(fs.existsSync('test/tmp/retina/sprite.png'), 'Sprite file created.');
		test.ok(fs.statSync('test/tmp/retina/sprite.png').size, 'Sprite file not empty.');

		test.ok(fs.existsSync('test/tmp/retina/sprite@2x.png'), 'Retina sprite file created.');
		test.ok(fs.statSync('test/tmp/retina/sprite@2x.png').size, 'Retina sprite file not empty.');

		test.ok(fs.existsSync('test/tmp/retina/sprite.styl'), 'Stylus file created.');
		test.equal(grunt.file.read('test/tmp/retina/sprite.styl'), grunt.file.read('test/expected/retina.styl'), 'Stylus file content is OK.');

		test.done();
	},
	params: function(test) {
		'use strict';

		test.ok(fs.existsSync('test/tmp/params/sprite.png'), 'Sprite file created.');
		test.ok(fs.statSync('test/tmp/params/sprite.png').size, 'Sprite file not empty.');

		test.ok(fs.existsSync('test/tmp/params/vars.styl'), 'Stylus file created.');

		test.done();
	}
};
