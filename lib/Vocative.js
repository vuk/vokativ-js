"use strict";
var fs = require('fs');
var q = require('q');
var azbuka = require('./Azbuka');
var striptags = require('striptags');
var _ = require('lodash');
var Vocative = (function () {
    function Vocative() {
        this.vokativ = '';
        this.cyrillic = null;
        this.exceptionCases = '';
        this.source = '';
        var path = __dirname + '/../data/dictonary.json';
        var rulesPath = __dirname + '/../data/rules.json';
        this.exceptionCases = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    Vocative.prototype.getSource = function () {
        return this.source;
    };
    Vocative.prototype.getCyrillic = function () {
        return this.cyrillic;
    };
    Vocative.prototype.getExceptions = function () {
        return this.exceptionCases;
    };
    Vocative.prototype.capitalizeName = function (name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    };
    Vocative.prototype.transliterate = function (text, toLat) {
        if (toLat === void 0) { toLat = true; }
        if (!toLat)
            azbuka = _.invert(azbuka);
        return this.strtr(text, azbuka);
    };
    Vocative.prototype.strtr = function (text, replacePairs) {
        var str = text.toString(), key, re;
        for (key in replacePairs) {
            if (replacePairs.hasOwnProperty(key)) {
                re = new RegExp(key, "g");
                str = str.replace(re, replacePairs[key]);
            }
        }
        return str;
    };
    Vocative.prototype.removeExtras = function (input) {
        input = input.trim();
        input = striptags(input);
        input = this.transliterate(input);
        return input;
    };
    Vocative.prototype.isCyrillic = function (text) {
        var deferred = q.defer();
        for (var i = 0; i < text.length; i++) {
            if (!azbuka.hasOwnProperty(text[i])) {
                deferred.resolve(false);
                return deferred.promise;
            }
        }
        deferred.resolve(true);
        return deferred.promise;
    };
    Vocative.prototype.isCyrillicAsync = function (text, response) {
        var cyrillicString = true;
        for (var cir in azbuka) {
            if (text.indexOf(azbuka[cir]) !== -1) {
                cyrillicString = false;
            }
        }
        response(null, cyrillicString);
    };
    Vocative.prototype.isCyrillicPromised = function (nominativ) {
        var response = this.isCyrillic(nominativ)
            .then(function (value) {
            return value;
        });
        return response;
    };
    Vocative.prototype.make = function (nominativ) {
        var _this = this;
        this.vokativ = '';
        var exceptions = this.getExceptions();
        var vokativResult = this.isCyrillicPromised(nominativ)
            .then(function (value) {
            _this.cyrillic = value;
            if (value) {
                nominativ = _this.transliterate(nominativ);
            }
            nominativ = _this.removeExtras(nominativ);
            nominativ = nominativ.toUpperCase();
            if (exceptions.hasOwnProperty(nominativ)) {
                _this.source = 'dictonary';
                if (_this.cyrillic) {
                    return _this.capitalizeName(_this.transliterate(exceptions[nominativ], false));
                }
                else {
                    return _this.capitalizeName(_this.transliterate(exceptions[nominativ]));
                }
            }
            if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'TAR' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'DAR')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RE';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ICA' && nominativ.length > 4)
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CE';
            else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'CA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CO';
            else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'SA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'SO';
            else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'OLAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'OČE';
            else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ALAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'ALČE';
            else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ILAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'IOČE';
            else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ELAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'EOČE';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'SAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'ŠČE';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'RAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'AČE';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'VAC')
                _this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'VČE';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ANJ')
                _this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'NJU';
            else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'GA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'GO';
            else if ((nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') && (nominativ.length > 4))
                _this.vokativ = nominativ;
            else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'JA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'IJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'DJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'NJA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'JO';
            else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'VA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'BA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'O';
            else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ARA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ERA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ORA')
                _this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RO';
            else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'K')
                _this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ČE';
            else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'G')
                _this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ŽE';
            else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ć' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Đ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Č' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DŽ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Š' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ž' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'LJ' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'NJ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'J')
                _this.vokativ = nominativ + 'U';
            else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'A' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'O' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'E' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'I')
                _this.vokativ = nominativ;
            else
                _this.vokativ = nominativ + 'E';
            if (_this.cyrillic) {
                _this.vokativ = _this.transliterate(_this.vokativ, false);
            }
            _this.source = 'algorithm';
            return _this.capitalizeName(_this.vokativ);
        });
        return vokativResult;
    };
    return Vocative;
}());
module.exports = Vocative;
