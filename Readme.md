# Sprite generator for [Tâmia](https://github.com/sapegin/tamia)

[![Build Status](https://travis-ci.org/sapegin/grunt-tamia-sprite.png)](https://travis-ci.org/sapegin/grunt-tamia-sprite)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

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

### Options

Options should be inside `options` object:

```
sprite: {
	all: {
		src: 'images/sprites/*.png',
		dest: 'build/sprite.png'
		options: {
			destStyl: 'styles/sprite.styl'
		}
	}
}
```

#### destStyl

Type: `String`, default: same as `dest` but with .styl extension.

Resulting Stylus file location. Use `false` to disable Stylus file generation.

#### destJson

Type: `String`, default: same as `dest` but with .json extension.

Resulting JSON file location. Use `false` to disable JSON file generation.

#### template

Type: `String`, default: `'{%=target%}_{%=name%} = {%=x%}px {%=y%}px {%=width%}px {%=height%}px'`.

Template for generating every string in a Stylus file.

#### fingerprintTemplate

Type: `String`, default: `'{%=target%}_fingerprint = "{%=fingerprint%}"'`.

Template for variable with fingerpting (date of last sprite modification).

```
sprite_image = sprite_image + '?' + sprite_fingerprint;
```

#### propertyTemplate

Type: `String`, default: `'{%=target%}_{%=name%} = {%=value%}px'`.

Template for spritesheet properties variables (width & height).

```
background-size: sprite_width sprite_height;
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

### Stylus Example (with nib & vars from JSON file)

``` scss
sprite = json("sprite.json", { hash: true })
.sprite
	image("sprite.png", sprite.properties.width * 1px, sprite.properties.height * 1px)

	for name, data in sprite.coordinates
		&_{name}
			add-property("background-position", data.x * 1px data.y * 1px)
			add-property("width", data.width * 1px)
			add-property("height", data.height * 1px)
```

## Changelog

The changelog can be found in the Changelog.md file.

---

## License

The MIT License, see the included `License.md` file.
