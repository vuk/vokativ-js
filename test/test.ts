///<reference path="..\definitions\definitions.d.ts" />
var expect = require('chai').expect;
var assert = require('chai').assert;
var Vocative = require('../lib/Vocative');

var vocative = require('../index');

describe('Testing Vocative methods', () => {

	var v;

	before((done) => {
        v = new Vocative();

        done();
    });

	it('should confirm cyrilic', () => { 
		v.isCyrillic('Вук')
			.then((value) => {
				expect(value).to.be.true;
			});
    });

    it('should confirm latin', () => {
        v.isCyrillic('Vuk')
			.then((value) => {
				expect(value).to.be.false;
			});
    });

    it('should return latin Vocative', () => {
        vocative.promised('Vuk').then((value) => {
			assert.equal(value, 'Vuče');	
        });
    });

    it('should return cyrillic Vocative', () => {
		vocative.promised('Вук').then((value) => {
			assert.equal(value, 'Вуче');
        });
    });

    it('should return latin Vocative from callback', () => {
        vocative.async('Vuk', (err, value) => {
			assert.equal(value, 'Vuče');
        });
    });

    it('should return cyrillic Vocative from callback', () => {
        vocative.async('Вук', (err, value) => {
			assert.equal(value, 'Вуче');
        });
    });
});