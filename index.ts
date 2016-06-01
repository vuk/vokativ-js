///<reference path=".\definitions\definitions.d.ts" />
var Vocative = require('./lib/Vocative');

var v = new Vocative();

var vocative = {
	promised : function(name: string) {
		return v.make(name)
			.then((value) => {
				return value;
			});
	},
	async: function(name: string, callback: any) {
		return v.make(name)
			.then((value) => {
				return value;
			}).nodeify(callback);
	}
}

export = vocative;

