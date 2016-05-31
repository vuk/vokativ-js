"use strict";
var Vocative = require('./lib/Vocative');
var v = new Vocative();
var vocative = {
    promised: function (name) {
        return v.make(name)
            .then(function (value) {
            return value;
        });
    },
    async: function (name, callback) {
        return v.make(name)
            .then(function (value) {
            return value;
        }).nodeify(callback);
    }
};
v.make('Партизан')
    .then(function (value) {
    console.log(value);
    return value;
});
module.exports = vocative;
