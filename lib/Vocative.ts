///<reference path="..\definitions\definitions.d.ts" />
var fs = require('fs');
var q = require('q');
var azbuka = require('./azbuka');
var striptags = require('striptags');

class Vocative {

	private vokativ = '';
	private cyrillic = null;
	private exceptionCases = '';
	private source = '';

	getSource(){
		return this.source;
	}

	getCyrillic(){
		return this.cyrillic;
	}

	getExceptions() {
		return this.exceptionCases;
	}
	
	constructor(file?: string) {
		var path = __dirname + '/../data/dictonary.json';
		if(file !== undefined){
			path = file;
		}
		this.exceptionCases = JSON.parse(fs.readFileSync(path, 'utf8'));
	}

	/**
	* Method to make sure provided name is in correct case (first letter of uppercase)
	*/
	capitalizeName(name: string){
		name = name.toLowerCase();
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	/**
	* Method transliterates cyrilic to latin and viceversa
	*/
	transliterate(text: string, toLat = true)
    {
		if (!toLat)
			azbuka = this.arrayFlip(azbuka);
		return this.strtr(text, azbuka);
	}

	/**
	* Implementation of PHP array_flip
	*/
	arrayFlip(trans: Array<any>) {
	    var key, tmp_ar = {};

	    for (key in trans) {
	        if (trans.hasOwnProperty(key)) {
	            tmp_ar[trans[key]] = key;
	        }
	    }
	    return tmp_ar;
	}

	/**
	* Implementation of PHP strtr
	*/
	strtr(text: string, replacePairs: Array<any>) {
		var str = text.toString(), key, re;
		for (key in replacePairs) {
			if (replacePairs.hasOwnProperty(key)) {
				re = new RegExp(key, "g");
				str = str.replace(re, replacePairs[key]);
			}
		}
		return str;
	}

	/**
     * @param string $input
     * @return string
     */
    removeExtras(input: string){
		input = input.trim();
		input = striptags(input);
		input = this.transliterate(input);
		return input;
	}

	isCyrillic(text: string)
	{
		var deferred = q.defer();

		for (var i = 0; i < text.length; i++) {
			if (!azbuka.hasOwnProperty(text[i])){
				deferred.resolve(false);
				return deferred.promise;
			}
		}
		deferred.resolve(true);
		return deferred.promise;
	} 

	isCyrillicAsync(text: string, response: any) {
		var cyrillicString = true;
		for (var cir in azbuka) {
			if (text.indexOf(azbuka[cir]) !== -1) {
				cyrillicString = false;
			}
		}
		response(null, cyrillicString);
	}

	isCyrillicPromised(nominativ: string){
		var response = this.isCyrillic(nominativ)
			.then((value) => {
				return value;
			});

		return response;
	}

	make(nominativ: string) {
		this.vokativ = '';
		var exceptions = this.getExceptions();

		var vokativResult = this.isCyrillicPromised(nominativ)
			.then((value) => {
				this.cyrillic = value;
				if (value) {
					nominativ = this.transliterate(nominativ);
				}
				nominativ = this.removeExtras(nominativ);
				nominativ = nominativ.toUpperCase();

				if (exceptions.hasOwnProperty(nominativ)) {
					//izvor je rečnik
					this.source = 'dictonary';
					//ako postoji izuzetak odmah vraćamo njegov vokativ u ćirilici ili latinici
					if (this.cyrillic) {
						return this.capitalizeName(this.transliterate(exceptions[nominativ], false));
					}
					else {
						return this.capitalizeName(this.transliterate(exceptions[nominativ]));
					}
				}

				if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'TAR' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'DAR') //PETAR, ALEKSANDAR
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RE';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ICA' && nominativ.length > 4)    //MILICA , LJUBICA ALI NE  I MICA i CICA
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CE';
				else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'CA')    //MACA, CECA...
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'CO';
				else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'SA')    //PERSA, BOSA
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'SO';
				else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'OLAC')    //KOLAC
					this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'OČE';
				else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ALAC')    //ZNALAC
					this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'ALČE';
				else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ILAC')    //MISLILAC
					this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'IOČE';
				else if (nominativ.substring(nominativ.length - 4, nominativ.length) == 'ELAC')    //ŽETELAC
					this.vokativ = nominativ.substring(0, nominativ.length - 4) + 'EOČE';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'SAC')    //PISAC
					this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'ŠČE';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'RAC')    //MUDRAC
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'AČE';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'VAC')    //VALJEVAC
					this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'VČE';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ANJ')    //SUŽANJ
					this.vokativ = nominativ.substring(0, nominativ.length - 3) + 'NJU';
				else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'GA')    //KAVGA
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'GO';

				else if ((nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') && (nominativ.length > 4))  //DARINKA, MILKA, BORKA, ALI NE I RAKA, MIKA
					this.vokativ = nominativ;
				else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'JA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'IJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'DJA' && nominativ.substring(nominativ.length - 3, nominativ.length) != 'NJA') //MAJA ALI NE I MARIJA, SANJA, NITI PEDJA (NE PEĐA)
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'JO';
				else if (nominativ.substring(nominativ.length - 2, nominativ.length) == 'VA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'BA' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'KA') //SAVA, DADA, SLOBA, RAKA
					this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'O';
				else if (nominativ.substring(nominativ.length - 3, nominativ.length) == 'ARA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ERA' || nominativ.substring(nominativ.length - 3, nominativ.length) == 'ORA') //PERA, DARA, BORA
					this.vokativ = nominativ.substring(0, nominativ.length - 2) + 'RO';
				else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'K')    //CUTUK
					this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ČE';
				else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'G')        //PREDRAG
					this.vokativ = nominativ.substring(0, nominativ.length - 1) + 'ŽE';
				//ć, đ, č, dž, š, ž, lj, nj, j
				else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ć' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Đ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Č' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'DŽ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Š' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'Ž' || nominativ.substring(nominativ.length - 2, nominativ.length) == 'LJ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'NJ' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'J')
					this.vokativ = nominativ + 'U';
				else if (nominativ.substring(nominativ.length - 1, nominativ.length) == 'A' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'O' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'E' || nominativ.substring(nominativ.length - 1, nominativ.length) == 'I') //VANJA, MARKO, MILE, MIKI
					this.vokativ = nominativ;
				else
					this.vokativ = nominativ + 'E';
				//ako koristimo ćirilicu vraćamo napravljeni vokativ iz latinice u ćirilicu
				if (this.cyrillic) {
					this.vokativ = this.transliterate(this.vokativ, false);
				}
				//izvor je algoritam
				this.source = 'algorithm';
				//vraćamo sređen vokativ (mala slova, prvo veliko)
				return this.capitalizeName(this.vokativ);
			});

		return vokativResult;
	}
}

export = Vocative; 