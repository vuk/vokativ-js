[![Build Status](https://travis-ci.org/vuk/vokativ-js.svg?branch=master)](https://travis-ci.org/vuk/vokativ-js)

# Vokativ JS

## Acknowledgements

This is a NodeJS port of PHP Vocative case library for Serbian language written by [Nemanja Avramovic](https://github.com/avramovic). 

Original idea and PHP implementation can be found at [Vokativ](https://github.com/avramovic/Vokativ). 

## Installation 

`npm install vokativ-js`

Optionally you can add `--save` flag to update `package.json` dependency list

## Usage 

### Using vokativ-js with promises (from [Q library](https://github.com/kriskowal/q))

```javascript

var vocative = require('vokativ-js');

vocative.promised('Vuk')
    .then(function(value){
    	console.log("Zdravo " + value); // Will reply with "Zdravo Vuče"
    });

```

### Using vokativ-js with callbacks 

```javascript

var vocative = require('vokativ-js');

vocative.async('Вук', function(err, value){
	if(!err){
		console.log("Здраво " + value); // Will reply with "Здраво Вуче" - so cyrillic script works as well
	}
});

```

### Note: 

Due to significant similarity, this library should also work just fine with Croatian, Bosnian, Montenegrin languages, but if there are any rules that algorithm may have missed feel free to contact me or make a pull request. 

If we find significant incompatibilities between any of the languages we could change API to something like this 

```javascript

	var promised 	= function(name, lang) { };
	var async		= function(name, lang, callback) { };

```

Where `lang` could be equal to `sr`, `hr`, `ba`, `me`