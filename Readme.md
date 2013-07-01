# Sprite generator for [Tâmia](https://github.com/sapegin/tamia)

Generates [spritesheet](http://en.wikipedia.org/wiki/Sprite_%28computer_graphics%29#Sprites_by_CSS) from PNG files and a list of Stylus variables with coordinates to use in [Tâmia](https://github.com/sapegin/tamia). Uses [spritesmith](https://github.com/Ensighten/spritesmith). Inspired by [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith).

## Installation

This plugin requires Grunt 0.4.

Install [GraphicsMagick](http://www.graphicsmagick.org/) (`brew install graphicsmagick` if you're on a Mac) *or* [Cairo](http://cairographics.org/). Then install grunt-tamia-sprite:

`npm install --save-dev grunt-tamia-sprite`

Add to your `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-tamia-sprite');
```

Then add section named `sprite` inside `grunt.initConfig()`. See next section for details.


### Parameters

#### src `String|Array`

Images list (PNG only). String or array. Wildcards are supported.

#### dest `String`

Resulting sprite image location.

#### [destStyl] `String` (default: same as `dest` but with .styl extension)

Resulting Stylus file location.

#### [template] `String` (default: `'{%=target%}_{%=name%} = {%=x%}px {%=y%}px {%=width%}px {%=height%}px'`)

Template for generating every string in a Stylus file.

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
	grunt.loadNpmTasks('grunt-tamia-sprite');
	grunt.registerTask('default', ['sprite']);
};
```

## Release History

### 2013-07-02 v0.0.2

* `template` option.

### 2013-04-08 v0.0.1

* Initial release.


---

## License

The MIT License, see the included `License.md` file.
