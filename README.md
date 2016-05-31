# Vokativ JS

[![Build Status](https://travis-ci.org/vuk/vokativ-js.svg?branch=master)](https://travis-ci.org/vuk/vokativ-js)


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

Due to significant similarity, this library should also work just fine with former Yuboslav languages such as Croatian, Bosnian, Montenegrin, but if there are any rules that algorithm may have missed feel free to contact me or make a pull request. 