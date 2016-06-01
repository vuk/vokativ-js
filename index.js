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
vocative.async('Peder', function (err, value) {
    if (!err) {
        console.log("Здраво " + value);
    }
});
module.exports = vocative;
