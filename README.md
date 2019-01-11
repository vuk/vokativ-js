# Vokativ JS

[![Build Status](https://travis-ci.org/vuk/vokativ-js.svg?branch=master)](https://travis-ci.org/vuk/vokativ-js)
[![NPM version](https://img.shields.io/badge/Latest%20Version-2.0.12-green.svg)](https://www.npmjs.com/package/vokativ-js)


## Acknowledgements

This is a NodeJS port of PHP Vocative case library for Serbian language written by [Nemanja Avramovic](https://github.com/avramovic). 

Original idea and PHP implementation can be found at [Vokativ](https://github.com/avramovic/Vokativ). 

## Installation 

`npm install vokativ-js`

Optionally you can add `--save` flag to update `package.json` dependency list

## Usage 

### As promise

```javascript

var Vocative = require('vokativ-js').Vocative;

var v = new Vokativ();
v.make('Vuk')
    .then((vocative) => {
        console.log(vocative);
    });

```

### With async/await 

```javascript

var Vokativ = require('vokativ-js').Vocative;

async function demo () {
    var v = new Vokativ();
    let name = await v.make('Vuk');
    console.log(name);    
}

demo();

```

### Note: 

Due to significant similarity, this library should also work just fine with former Yugoslav languages such as Croatian, Bosnian, Montenegrin, but if there are any rules that were missed feel free to contact me or make a pull request. 