var expect = require('chai').expect;
var assert = require('chai').assert;
var Vocative = require('../lib/Vocative');
var vocative = require('../index');
describe('Testing Vocative methods', function () {
    var v;
    before(function (done) {
        v = new Vocative();
        done();
    });
    it('should confirm cyrilic', function () {
        v.isCyrillic('Вук')
            .then(function (value) {
            expect(value).to.be.true;
        });
    });
    it('should confirm latin', function () {
        v.isCyrillic('Vuk')
            .then(function (value) {
            expect(value).to.be.false;
        });
    });
    it('should return latin Vocative', function () {
        vocative.promised('Vuk').then(function (value) {
            assert.equal(value, 'Vuče');
        });
    });
    it('should return cyrillic Vocative', function () {
        vocative.promised('Вук').then(function (value) {
            assert.equal(value, 'Вуче');
        });
    });
    it('should return latin Vocative from callback', function () {
        vocative.async('Vuk', function (err, value) {
            assert.equal(value, 'Vuče');
        });
    });
    it('should return cyrillic Vocative from callback', function () {
        vocative.async('Вук', function (err, value) {
            assert.equal(value, 'Вуче');
        });
    });
});
