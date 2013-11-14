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

#### src

Type: `String|Array`.

Images list (PNG only). String or array. Wildcards are supported.

#### dest

Type: `String`.

Resulting sprite image location.

#### destStyl

Type: `String`, default: same as `dest` but with .styl extension.

Resulting Stylus file location.

#### template

Type: `String`, default: `'{%=target%}_{%=name%} = {%=x%}px {%=y%}px {%=width%}px {%=height%}px'`.

Template for generating every string in a Stylus file.

#### fingerprintTemplate

Type: `String`, default: `'{%=target%}_fingerprint = "{%=fingerprint%}"'`.

Template for variable with fingerpting (date of last sprite modification).

```
sprite_image = sprite_image + '?' + sprite_fingerprint;
```

#### algorithm

Type: `String`, default: `'binary-tree'`

Layout algorithm (top-down, left-right, diagonal, alt-diagonal, binary-tree).

#### padding

Type: `String`, default: `3`.

Padding between images.

#### engine

Type: `String`, default: `'auto'`

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

## Changelog

The changelog can be found in the Changelog.md file.

---

## License

The MIT License, see the included `License.md` file.
