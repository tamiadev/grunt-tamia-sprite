# Sprite generator for Squirrel.styl

Generates sprite image from PNG files and a list of Stylus variables to use in [Squirrel.styl](https://github.com/sapegin/squirrelstrap/tree/master/templates/stylusdir/root/styles/squirrel). Uses [spritesmith](https://github.com/Ensighten/spritesmith). Inspired by [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith).

## Installation

This plugin requires Grunt 0.4.

Install [GraphicsMagick](http://www.graphicsmagick.org/) (`brew install graphicsmagick` if you're on a Mac) *or* [Cairo](http://cairographics.org/). Then install grunt-squirrelsprite:

`npm install grunt-squirrelsprite --save-dev`

Add to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-squirrelsprite');
```

Then add section named `sprite` inside `grunt.initConfig()`. See next section for details.


### Parameters

#### src `String|Array`

Images list (PNG only). String or array. Wildcards are supported.

#### dest `String`

Resulting sprite image location.

#### [destStyl] `String` (default: same as `dest` but with .styl extension)

Resulting Stylus file location.

#### [algorithm] `String` (default: `'top-down'`)

Layout algorithm (top-down, left-right, diagonal, alt-diagonal).

#### [engine] `String` (default: `'auto'`)

Generation engine (auto, gm, canvas).


### Gruntfile Example

``` javascript
module.exports = function(grunt) {
	grunt.initConfig({
		sprite: {
			all: {
				src: 'images/sprites/*.png',
				dest: 'build/sprite.png'
			}
		}
	});
	grunt.loadNpmTasks('grunt-squirrelsprite');
	grunt.registerTask('default', ['sprite']);
};
```

## Release History

### 2013-03-20 v0.0.1

* Initial release.


---

## License

The MIT License, see the included `License.md` file.
