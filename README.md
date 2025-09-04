# Vokativ JS

[![NPM version](https://img.shields.io/badge/Latest%20Version-3.3.0-green.svg)](https://www.npmjs.com/package/vokativ-js)

<!-- [![Build Status](https://app.travis-ci.com/vuk/vokativ-js.svg?branch=master)](https://app.travis-ci.com/vuk/vokativ-js) -->

## Acknowledgement

This is a JavaScript port of PHP Vocative case library for Serbian language written by [Nemanja Avramovic](https://github.com/avramovic).

Original idea and PHP implementation can be found at [Vokativ](https://github.com/avramovic/Vokativ).

## Installation

`npm install vokativ-js`

Optionally you can add `--save` flag to update `package.json` dependency list

## Usage

### As promise

```javascript
var Vocative = require("vokativ-js").Vocative;

var v = new Vocative();
v.make("Vuk").then((vocative) => {
  console.log(vocative);
});
```

### With async/await

```javascript
var Vocative = require("vokativ-js").Vocative;

async function demo() {
  var v = new Vocative();
  let name = await v.make("Vuk");
  console.log(name);
}

demo();
```

### With Typescript

```typescript
import { Vocative } from "vokativ-js";

let v = new Vocative();

v.make("Vuk").then((vocative) => {
  console.log(vocative);
});
```

### Synchronous method

```typescript
import { Vocative } from "vokativ-js";

let v = new Vocative();

console.log(v.call("Vuk"));
```

### Note:

Due to significant similarity, this library should also work just fine with former Yugoslav languages such as Croatian, Bosnian, Montenegrin, but if there are any rules that were missed feel free to contact me or make a pull request.
